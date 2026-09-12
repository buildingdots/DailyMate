import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SubscriptionPlan,
  SubscriptionStatus,
} from '../../domain/subscription-plan';

export class SubscriptionResponseDto {
  @ApiProperty({ enum: SubscriptionPlan })
  plan: SubscriptionPlan;

  @ApiProperty({ enum: SubscriptionStatus })
  status: SubscriptionStatus;

  @ApiPropertyOptional()
  currentPeriodStart?: Date;

  @ApiPropertyOptional()
  currentPeriodEnd?: Date;

  @ApiProperty()
  cancelAtPeriodEnd: boolean;

  @ApiProperty({
    description: 'Whether the user currently has an active paid entitlement',
  })
  isPro: boolean;
}
