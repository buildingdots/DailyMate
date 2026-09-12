import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AuthProviderType } from '../../domain/auth-provider';
import { UserStatus } from '../../domain/user-status';
import { WealthTier } from '../../domain/wealth-tier';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'alex.morgan@email.com' })
  email: string;

  @ApiProperty({ example: 'Alex Morgan' })
  fullName: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  avatarUrl?: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ enum: AuthProviderType, isArray: true })
  authProviders: AuthProviderType[];

  @ApiPropertyOptional({ enum: WealthTier })
  wealthTier?: WealthTier;

  @ApiPropertyOptional()
  wealthTierUpdatedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
