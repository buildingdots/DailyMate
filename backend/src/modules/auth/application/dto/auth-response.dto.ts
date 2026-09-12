import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionResponseDto } from '../../../subscriptions/application/dto/subscription-response.dto';
import { UserResponseDto } from '../../../users/application/dto/user-response.dto';

export class AuthTokensDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ example: '15m' })
  expiresIn: string;
}

export class AuthResponseDto {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @ApiProperty({ type: SubscriptionResponseDto })
  subscription: SubscriptionResponseDto;

  @ApiProperty({ type: AuthTokensDto })
  tokens: AuthTokensDto;
}
