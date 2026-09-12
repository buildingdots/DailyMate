import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class LogoutDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiProperty({ description: 'Client-generated device identifier' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  deviceId: string;
}
