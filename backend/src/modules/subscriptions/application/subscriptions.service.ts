import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import Stripe from 'stripe';
import { UsersService } from '../../users/application/users.service';
import {
  SubscriptionPlan,
  SubscriptionStatus,
} from '../domain/subscription-plan';
import {
  Subscription,
  SubscriptionDocument,
} from '../infrastructure/persistence/subscription.schema';
import { toSubscriptionResponse } from './mappers/subscription.mapper';

@Injectable()
export class SubscriptionsService {
  private readonly stripe: Stripe | null;

  constructor(
    @InjectModel(SubscriptionDocument.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    const secretKey = this.configService.get<string>('stripe.secretKey');
    this.stripe = secretKey ? new Stripe(secretKey) : null;
  }

  async createFreeSubscription(userId: string): Promise<Subscription> {
    return this.subscriptionModel.create({
      userId: new Types.ObjectId(userId),
      plan: SubscriptionPlan.Free,
      status: SubscriptionStatus.Active,
    });
  }

  async getForUser(userId: string) {
    const subscription = await this.subscriptionModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return toSubscriptionResponse(subscription);
  }

  async createCheckoutSession(userId: string, plan: SubscriptionPlan) {
    if (!this.stripe) {
      throw new BadRequestException('Stripe is not configured');
    }

    if (plan === SubscriptionPlan.Free) {
      throw new BadRequestException('Cannot create checkout for free plan');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let subscription = await this.subscriptionModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!subscription) {
      subscription = await this.createFreeSubscription(userId);
    }

    let stripeCustomerId = subscription.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        metadata: { userId },
      });
      stripeCustomerId = customer.id;
      subscription.stripeCustomerId = stripeCustomerId;
      await subscription.save();
    }

    const priceId = this.getPriceId(plan);
    const appUrl = this.configService.get<string>(
      'appUrl',
      'http://localhost:3000',
    );

    const session = await this.stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/subscription/cancel`,
      metadata: { userId, plan },
      subscription_data: {
        metadata: { userId, plan },
      },
    });

    return { checkoutUrl: session.url, sessionId: session.id };
  }

  async handleStripeWebhook(rawBody: Buffer, signature: string) {
    if (!this.stripe) {
      throw new BadRequestException('Stripe is not configured');
    }

    const webhookSecret = this.configService.get<string>(
      'stripe.webhookSecret',
    );
    if (!webhookSecret) {
      throw new BadRequestException('Stripe webhook secret is not configured');
    }

    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );

    switch (event.type) {
      case 'checkout.session.completed':
        await this.onCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.updated':
        await this.onSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await this.onSubscriptionDeleted(event.data.object);
        break;
      case 'invoice.payment_failed':
        await this.onPaymentFailed(event.data.object);
        break;
      default:
        break;
    }

    return { received: true };
  }

  private async onCheckoutCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan as SubscriptionPlan | undefined;

    if (!userId || !plan) {
      return;
    }

    const stripeSubscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription?.id;

    if (!stripeSubscriptionId || !this.stripe) {
      return;
    }

    const stripeSub =
      await this.stripe.subscriptions.retrieve(stripeSubscriptionId);

    await this.updateFromStripeSubscription(userId, plan, stripeSub);
  }

  private async onSubscriptionUpdated(stripeSub: Stripe.Subscription) {
    let userId = stripeSub.metadata?.userId;
    if (!userId) {
      const subscription = await this.subscriptionModel.findOne({
        stripeSubscriptionId: stripeSub.id,
      });
      if (!subscription) return;
      userId = subscription.userId.toString();
    }

    const plan = this.resolvePlanFromStripe(stripeSub);
    await this.updateFromStripeSubscription(userId, plan, stripeSub);
  }

  private async onSubscriptionDeleted(stripeSub: Stripe.Subscription) {
    const subscription = await this.subscriptionModel.findOne({
      stripeSubscriptionId: stripeSub.id,
    });

    if (!subscription) return;

    subscription.plan = SubscriptionPlan.Free;
    subscription.status = SubscriptionStatus.Expired;
    subscription.stripeSubscriptionId = undefined;
    subscription.currentPeriodStart = undefined;
    subscription.currentPeriodEnd = undefined;
    subscription.cancelAtPeriodEnd = false;
    await subscription.save();
  }

  private async onPaymentFailed(invoice: Stripe.Invoice) {
    const stripeSubscription =
      invoice.parent?.subscription_details?.subscription;
    const stripeSubscriptionId =
      typeof stripeSubscription === 'string'
        ? stripeSubscription
        : stripeSubscription?.id;

    if (!stripeSubscriptionId) return;

    await this.subscriptionModel.updateOne(
      { stripeSubscriptionId },
      { status: SubscriptionStatus.PastDue },
    );
  }

  private async updateFromStripeSubscription(
    userId: string,
    plan: SubscriptionPlan,
    stripeSub: Stripe.Subscription,
  ) {
    const subscriptionItem = stripeSub.items.data[0];
    const periodStart = subscriptionItem?.current_period_start
      ? new Date(subscriptionItem.current_period_start * 1000)
      : undefined;
    const periodEnd = subscriptionItem?.current_period_end
      ? new Date(subscriptionItem.current_period_end * 1000)
      : undefined;

    await this.subscriptionModel.updateOne(
      { userId: new Types.ObjectId(userId) },
      {
        plan,
        status: this.mapStripeStatus(stripeSub.status),
        stripeSubscriptionId: stripeSub.id,
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: stripeSub.cancel_at_period_end,
      },
      { upsert: true },
    );
  }

  private mapStripeStatus(
    status: Stripe.Subscription.Status,
  ): SubscriptionStatus {
    switch (status) {
      case 'active':
        return SubscriptionStatus.Active;
      case 'trialing':
        return SubscriptionStatus.Trialing;
      case 'past_due':
        return SubscriptionStatus.PastDue;
      case 'canceled':
        return SubscriptionStatus.Canceled;
      default:
        return SubscriptionStatus.Expired;
    }
  }

  private resolvePlanFromStripe(
    stripeSub: Stripe.Subscription,
  ): SubscriptionPlan {
    const priceId = stripeSub.items.data[0]?.price?.id;
    const monthlyPriceId = this.configService.get<string>(
      'stripe.proMonthlyPriceId',
    );
    const yearlyPriceId = this.configService.get<string>(
      'stripe.proYearlyPriceId',
    );

    if (priceId === yearlyPriceId) {
      return SubscriptionPlan.ProYearly;
    }
    if (priceId === monthlyPriceId) {
      return SubscriptionPlan.ProMonthly;
    }

    return SubscriptionPlan.ProMonthly;
  }

  private getPriceId(plan: SubscriptionPlan): string {
    const monthlyPriceId = this.configService.get<string>(
      'stripe.proMonthlyPriceId',
    );
    const yearlyPriceId = this.configService.get<string>(
      'stripe.proYearlyPriceId',
    );

    if (plan === SubscriptionPlan.ProMonthly) {
      if (!monthlyPriceId) {
        throw new BadRequestException('Monthly price is not configured');
      }
      return monthlyPriceId;
    }

    if (plan === SubscriptionPlan.ProYearly) {
      if (!yearlyPriceId) {
        throw new BadRequestException('Yearly price is not configured');
      }
      return yearlyPriceId;
    }

    throw new BadRequestException('Invalid subscription plan');
  }
}
