import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'alex.morgan@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePass1' })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @ApiProperty({ description: 'Client-generated device identifier' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  deviceId: string;
}
