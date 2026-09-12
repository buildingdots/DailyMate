import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Alex Morgan' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  fullName?: string;

  @ApiPropertyOptional({ example: '+919820154321' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  avatarUrl?: string;
}
