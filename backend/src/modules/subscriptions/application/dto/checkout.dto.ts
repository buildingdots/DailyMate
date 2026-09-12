import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { SubscriptionPlan } from '../../domain/subscription-plan';

export class CreateCheckoutDto {
  @ApiProperty({
    enum: [SubscriptionPlan.ProMonthly, SubscriptionPlan.ProYearly],
    example: SubscriptionPlan.ProMonthly,
  })
  @IsIn([SubscriptionPlan.ProMonthly, SubscriptionPlan.ProYearly])
  plan: SubscriptionPlan;
}
