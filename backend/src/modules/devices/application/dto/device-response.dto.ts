import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DevicePlatform } from '../../domain/device-platform';

export class DeviceResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  deviceId: string;

  @ApiProperty({ enum: DevicePlatform })
  platform: DevicePlatform;

  @ApiPropertyOptional()
  deviceName?: string;

  @ApiPropertyOptional()
  osVersion?: string;

  @ApiPropertyOptional()
  appVersion?: string;

  @ApiProperty()
  hasPushToken: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  lastActiveAt: Date;

  @ApiProperty()
  registeredAt: Date;
}
