import { Subscription } from '../../infrastructure/persistence/subscription.schema';
import {
  SubscriptionPlan,
  SubscriptionStatus,
} from '../../domain/subscription-plan';
import { SubscriptionResponseDto } from '../dto/subscription-response.dto';

export function toSubscriptionResponse(
  subscription: Subscription,
): SubscriptionResponseDto {
  const isPro =
    subscription.status === SubscriptionStatus.Active ||
    subscription.status === SubscriptionStatus.Trialing
      ? subscription.plan !== SubscriptionPlan.Free
      : false;

  return {
    plan: subscription.plan,
    status: subscription.status,
    currentPeriodStart: subscription.currentPeriodStart,
    currentPeriodEnd: subscription.currentPeriodEnd,
    cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    isPro,
  };
}
