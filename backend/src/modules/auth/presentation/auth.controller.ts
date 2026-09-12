import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
import { LoginDto } from '../application/dto/login.dto';
import { LogoutDto } from '../application/dto/logout.dto';
import { AppleAuthDto, GoogleAuthDto } from '../application/dto/oauth.dto';
import { RefreshTokenDto } from '../application/dto/refresh-token.dto';
import { RegisterDto } from '../application/dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register')
  @ApiOperation({ summary: 'Register with email and password' })
  @ApiOkResponse({ type: AuthResponseDto })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
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
  async logout(@CurrentUser() user: RequestUser & object, @Body() dto: LogoutDto) {
    await this.authService.logout(user.userId, dto.deviceId, dto.refreshToken);
  }
}
