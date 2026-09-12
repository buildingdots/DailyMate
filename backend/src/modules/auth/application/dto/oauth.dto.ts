import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class GoogleAuthDto {
  @ApiProperty({ description: 'Google ID token from the mobile client' })
  @IsString()
  idToken: string;

  @ApiProperty({ description: 'Client-generated device identifier' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  deviceId: string;
}

export class AppleAuthDto {
  @ApiProperty({ description: 'Apple identity token from the mobile client' })
  @IsString()
  identityToken: string;

  @ApiPropertyOptional({ example: 'Alex Morgan' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  fullName?: string;

  @ApiProperty({ description: 'Client-generated device identifier' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  deviceId: string;
}
