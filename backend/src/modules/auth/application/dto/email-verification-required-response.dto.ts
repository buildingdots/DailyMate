import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmailVerificationRequiredResponseDto {
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  emailVerificationDeadlineAt: Date;

  @ApiPropertyOptional()
  nextReminderAt?: Date;
}
