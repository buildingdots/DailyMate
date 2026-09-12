import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { WealthTier } from '../../domain/wealth-tier';

export class UpdateWealthTierDto {
  @ApiProperty({
    enum: WealthTier,
    description:
      'Client-computed tier label based on total assets. No financial amounts are sent to the server.',
    example: WealthTier.Diamond,
  })
  @IsEnum(WealthTier)
  wealthTier: WealthTier;
}
