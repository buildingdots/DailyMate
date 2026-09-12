import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthProviderType } from '../../users/domain/auth-provider';
import { UsersService } from '../../users/application/users.service';
import { SubscriptionsService } from '../../subscriptions/application/subscriptions.service';
import { DevicesService } from '../../devices/application/devices.service';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../infrastructure/persistence/refresh-token.schema';
import { OAuthService } from '../infrastructure/oauth/oauth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AppleAuthDto, GoogleAuthDto } from './dto/oauth.dto';
import { toUserResponse } from '../../users/application/mappers/user.mapper';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface AuthResponse {
  user: ReturnType<typeof toUserResponse>;
  subscription: Awaited<ReturnType<SubscriptionsService['getForUser']>>;
  tokens: AuthTokens;
}

@Injectable()
export class AuthService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiresIn: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly devicesService: DevicesService,
    private readonly oauthService: OAuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(RefreshTokenDocument.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {
    this.accessSecret = this.configService.getOrThrow<string>(
      'jwt.accessSecret',
    );
    this.refreshSecret = this.configService.getOrThrow<string>(
      'jwt.refreshSecret',
    );
    this.accessExpiresIn = this.configService.get<string>(
      'jwt.accessExpiresIn',
      '15m',
    );
    this.refreshExpiresIn = this.configService.get<string>(
      'jwt.refreshExpiresIn',
      '7d',
    );
  }

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.createUser({
      email: dto.email,
      fullName: dto.fullName,
      passwordHash,
      provider: AuthProviderType.Email,
    });

    await this.subscriptionsService.createFreeSubscription(user._id.toString());
    await this.devicesService.touchDevice(user._id.toString(), dto.deviceId);

    return this.buildAuthResponse(user, dto.deviceId);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user?.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    await this.devicesService.touchDevice(user._id.toString(), dto.deviceId);
    return this.buildAuthResponse(user, dto.deviceId);
  }

  async loginWithGoogle(dto: GoogleAuthDto): Promise<AuthResponse> {
    const profile = await this.oauthService.verifyGoogleToken(dto.idToken);
    return this.handleOAuthLogin(
      AuthProviderType.Google,
      profile.sub,
      profile.email,
      profile.name,
      profile.picture,
      dto.deviceId,
    );
  }

  async loginWithApple(dto: AppleAuthDto): Promise<AuthResponse> {
    const profile = await this.oauthService.verifyAppleToken(dto.identityToken);
    const fullName = dto.fullName ?? profile.email.split('@')[0];

    return this.handleOAuthLogin(
      AuthProviderType.Apple,
      profile.sub,
      profile.email,
      fullName,
      undefined,
      dto.deviceId,
    );
  }

  async refresh(refreshToken: string, deviceId: string): Promise<AuthTokens> {
    const tokenHash = this.hashToken(refreshToken);
    const stored = await this.refreshTokenModel.findOne({
      tokenHash,
      deviceId,
      revoked: false,
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.usersService.findById(stored.userId.toString());
    if (!user) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    stored.revoked = true;
    stored.revokedAt = new Date();
    await stored.save();

    return this.issueTokens(user._id.toString(), user.email, deviceId);
  }

  async logout(
    userId: string,
    deviceId: string,
    refreshToken?: string,
  ): Promise<void> {
    if (refreshToken) {
      const tokenHash = this.hashToken(refreshToken);
      await this.refreshTokenModel.updateOne(
        { userId, deviceId, tokenHash, revoked: false },
        { revoked: true, revokedAt: new Date() },
      );
    } else {
      await this.refreshTokenModel.updateMany(
        { userId, deviceId, revoked: false },
        { revoked: true, revokedAt: new Date() },
      );
    }

    await this.devicesService.deactivateDevice(userId, deviceId);
  }

  private async handleOAuthLogin(
    provider: AuthProviderType,
    providerId: string,
    email: string,
    fullName: string,
    avatarUrl?: string,
    deviceId?: string,
  ): Promise<AuthResponse> {
    if (!email) {
      throw new BadRequestException('OAuth provider did not return an email');
    }

    let user =
      (await this.usersService.findByProvider(provider, providerId)) ??
      (await this.usersService.findByEmail(email));

    if (!user) {
      user = await this.usersService.createUser({
        email,
        fullName,
        provider,
        providerId,
        emailVerified: true,
        avatarUrl,
      });
      await this.subscriptionsService.createFreeSubscription(
        user._id.toString(),
      );
    } else {
      await this.usersService.linkProvider(user, provider, providerId);
      if (avatarUrl && !user.avatarUrl) {
        user.avatarUrl = avatarUrl;
        await user.save();
      }
    }

    if (!deviceId) {
      throw new BadRequestException('deviceId is required');
    }

    await this.devicesService.touchDevice(user._id.toString(), deviceId);
    return this.buildAuthResponse(user, deviceId);
  }

  private async buildAuthResponse(
    user: Awaited<ReturnType<UsersService['findById']>> & object,
    deviceId: string,
  ): Promise<AuthResponse> {
    const tokens = await this.issueTokens(
      user._id.toString(),
      user.email,
      deviceId,
    );
    const subscription = await this.subscriptionsService.getForUser(
      user._id.toString(),
    );

    return {
      user: toUserResponse(user),
      subscription,
      tokens,
    };
  }

  private async issueTokens(
    userId: string,
    email: string,
    deviceId: string,
  ): Promise<AuthTokens> {
    const accessToken = this.jwtService.sign(
      { sub: userId, email },
      { secret: this.accessSecret, expiresIn: this.accessExpiresIn },
    );

    const refreshToken = randomBytes(48).toString('hex');
    const refreshExpiresMs = this.parseDurationToMs(this.refreshExpiresIn);

    await this.refreshTokenModel.create({
      userId,
      tokenHash: this.hashToken(refreshToken),
      deviceId,
      expiresAt: new Date(Date.now() + refreshExpiresMs),
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.accessExpiresIn,
    };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private parseDurationToMs(duration: string): number {
    const match = /^(\d+)([smhd])$/.exec(duration);
    if (!match) {
      return 7 * 24 * 60 * 60 * 1000;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        return 7 * 24 * 60 * 60 * 1000;
    }
  }
}
