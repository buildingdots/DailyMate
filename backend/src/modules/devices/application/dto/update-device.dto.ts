import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDeviceDto {
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
