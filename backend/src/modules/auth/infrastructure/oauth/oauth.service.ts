import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import appleSignin from 'apple-signin-auth';

export interface OAuthProfile {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}

@Injectable()
export class OAuthService {
  private readonly googleClient: OAuth2Client | null;
  private readonly appleClientId: string | undefined;

  constructor(private readonly configService: ConfigService) {
    const googleClientId = this.configService.get<string>('oauth.googleClientId');
    this.googleClient = googleClientId ? new OAuth2Client(googleClientId) : null;
    this.appleClientId = this.configService.get<string>('oauth.appleClientId');
  }

  async verifyGoogleToken(idToken: string): Promise<OAuthProfile> {
    if (!this.googleClient) {
      throw new UnauthorizedException('Google authentication is not configured');
    }

    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: this.configService.get<string>('oauth.googleClientId'),
    });

    const payload = ticket.getPayload();
    if (!payload?.sub || !payload.email) {
      throw new UnauthorizedException('Invalid Google token');
    }

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  }

  async verifyAppleToken(identityToken: string): Promise<OAuthProfile> {
    if (!this.appleClientId) {
      throw new UnauthorizedException('Apple authentication is not configured');
    }

    const payload = await appleSignin.verifyIdToken(identityToken, {
      audience: this.appleClientId,
      ignoreExpiration: false,
    });

    if (!payload.sub) {
      throw new UnauthorizedException('Invalid Apple token');
    }

    return {
      sub: payload.sub,
      email: payload.email ?? `${payload.sub}@privaterelay.appleid.com`,
    };
  }
}
