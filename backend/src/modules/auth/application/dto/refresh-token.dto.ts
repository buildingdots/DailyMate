import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty({ description: 'Client-generated device identifier' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  deviceId: string;
}
