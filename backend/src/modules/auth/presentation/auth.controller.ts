import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../../../common/decorators/public.decorator';
import { SWAGGER_BEARER_AUTH } from '../../../config/swagger.config';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RequestUser } from '../../../common/types/request-user';
import { AuthService } from '../application/auth.service';
import {
  AuthResponseDto,
  AuthTokensDto,
} from '../application/dto/auth-response.dto';
import { EmailVerificationRequiredResponseDto } from '../application/dto/email-verification-required-response.dto';
import { LoginDto } from '../application/dto/login.dto';
import { LogoutDto } from '../application/dto/logout.dto';
import { AppleAuthDto, GoogleAuthDto } from '../application/dto/oauth.dto';
import { RefreshTokenDto } from '../application/dto/refresh-token.dto';
import { ResendEmailVerificationDto } from '../application/dto/resend-email-verification.dto';
import { RegisterDto } from '../application/dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register')
  @ApiOperation({ summary: 'Register with email and password' })
  @ApiOkResponse({ type: EmailVerificationRequiredResponseDto })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Get('verify-email')
  @Header('Content-Type', 'text/html; charset=utf-8')
  @ApiOperation({ summary: 'Verify email signup link' })
  @ApiOkResponse({ description: 'Email verification result page' })
  async verifyEmail(@Query('token') token?: string) {
    if (!token) {
      throw new BadRequestException('Verification token is required');
    }

    const email = await this.authService.verifyEmailLink(token);
    return this.renderEmailVerificationSuccess(email);
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('resend-email-verification')
  @ApiOperation({ summary: 'Resend email signup verification link' })
  @ApiOkResponse({ type: EmailVerificationRequiredResponseDto })
  resendEmailVerification(@Body() dto: ResendEmailVerificationDto) {
    return this.authService.resendEmailVerification(dto.email);
  }

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('login')
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiOkResponse({ type: AuthResponseDto })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('google')
  @ApiOperation({ summary: 'Sign in with Google ID token' })
  @ApiOkResponse({ type: AuthResponseDto })
  google(@Body() dto: GoogleAuthDto) {
    return this.authService.loginWithGoogle(dto);
  }

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('apple')
  @ApiOperation({ summary: 'Sign in with Apple identity token' })
  @ApiOkResponse({ type: AuthResponseDto })
  apple(@Body() dto: AppleAuthDto) {
    return this.authService.loginWithApple(dto);
  }

  @Public()
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Post('refresh')
  @ApiOperation({ summary: 'Rotate access and refresh tokens' })
  @ApiOkResponse({ type: AuthTokensDto })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken, dto.deviceId);
  }

  @Post('logout')
  @HttpCode(204)
  @ApiBearerAuth(SWAGGER_BEARER_AUTH)
  @ApiOperation({ summary: 'Sign out and revoke refresh token for a device' })
  @ApiNoContentResponse()
  async logout(
    @CurrentUser() user: RequestUser & object,
    @Body() dto: LogoutDto,
  ) {
    await this.authService.logout(user.userId, dto.deviceId, dto.refreshToken);
  }

  private renderEmailVerificationSuccess(email: string): string {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Email verified</title>
  </head>
  <body style="margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 16px;">
      <section style="max-width:520px;width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;padding:42px 34px;text-align:center;box-shadow:0 20px 60px rgba(15,23,42,0.08);">
        <div style="font-size:26px;line-height:32px;font-weight:800;color:#0f172a;margin-bottom:22px;">Daily<span style="color:#0d9488;">Mate</span></div>
        <div style="display:inline-block;padding:9px 16px;border:1px solid #99f6e4;border-radius:999px;background:#f0fdfa;color:#0d9488;font-size:13px;line-height:18px;font-weight:800;margin-bottom:20px;">Email Verified</div>
        <h1 style="margin:0 0 12px;font-size:30px;line-height:36px;font-weight:800;">Your account is ready</h1>
        <p style="margin:0;color:#64748b;font-size:16px;line-height:25px;">${this.escapeHtml(email)} has been verified. You can now return to DailyMate and sign in.</p>
      </section>
    </main>
  </body>
</html>`;
  }

  private escapeHtml(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
}
