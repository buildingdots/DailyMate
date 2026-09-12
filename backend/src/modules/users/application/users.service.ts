import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthProviderType } from '../domain/auth-provider';
import { UserStatus } from '../domain/user-status';
import { WealthTier } from '../domain/wealth-tier';
import {
  User,
  UserDocument,
} from '../infrastructure/persistence/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { toUserResponse } from './mappers/user.mapper';

export interface CreateUserInput {
  email: string;
  fullName: string;
  passwordHash?: string;
  provider: AuthProviderType;
  providerId?: string;
  emailVerified?: boolean;
  avatarUrl?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserDocument.name) private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email.toLowerCase(), status: { $ne: UserStatus.Deleted } });
  }

  async findById(userId: string): Promise<User | null> {
    return this.userModel.findOne({ _id: userId, status: { $ne: UserStatus.Deleted } });
  }

  async findByProvider(
    provider: AuthProviderType,
    providerId: string,
  ): Promise<User | null> {
    return this.userModel.findOne({
      authProviders: { $elemMatch: { provider, providerId } },
      status: { $ne: UserStatus.Deleted },
    });
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const existing = await this.findByEmail(input.email);
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const user = await this.userModel.create({
      email: input.email.toLowerCase(),
      fullName: input.fullName,
      passwordHash: input.passwordHash,
      avatarUrl: input.avatarUrl,
      emailVerified: input.emailVerified ?? false,
      authProviders: [
        {
          provider: input.provider,
          providerId: input.providerId,
          linkedAt: new Date(),
        },
      ],
    });

    return user;
  }

  async linkProvider(
    user: User,
    provider: AuthProviderType,
    providerId?: string,
  ): Promise<User> {
    const alreadyLinked = user.authProviders.some(
      (p) => p.provider === provider,
    );

    if (!alreadyLinked) {
      user.authProviders.push({
        provider,
        providerId,
        linkedAt: new Date(),
      });
      await user.save();
    }

    return user;
  }

  async getProfile(userId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return toUserResponse(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.fullName !== undefined) user.fullName = dto.fullName;
    if (dto.phone !== undefined) user.phone = dto.phone;
    if (dto.avatarUrl !== undefined) user.avatarUrl = dto.avatarUrl;

    await user.save();
    return toUserResponse(user);
  }

  async updateWealthTier(userId: string, wealthTier: WealthTier) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.wealthTier = wealthTier;
    user.wealthTierUpdatedAt = new Date();
    await user.save();

    return toUserResponse(user);
  }
}
