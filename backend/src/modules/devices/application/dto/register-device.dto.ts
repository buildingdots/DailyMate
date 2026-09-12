import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { DevicePlatform } from '../../domain/device-platform';

export class RegisterDeviceDto {
  @ApiProperty({ description: 'Client-generated device identifier' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  deviceId: string;

  @ApiProperty({ enum: DevicePlatform })
  @IsEnum(DevicePlatform)
  platform: DevicePlatform;

  @ApiPropertyOptional({ example: 'iPhone 15 Pro' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  deviceName?: string;

  @ApiPropertyOptional({ example: '17.5' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  osVersion?: string;

  @ApiPropertyOptional({ example: '1.0.0' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  appVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(512)
  pushToken?: string;
}
