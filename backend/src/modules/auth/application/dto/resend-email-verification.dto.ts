import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendEmailVerificationDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  email: string;
}
