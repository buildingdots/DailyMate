import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { SubscriptionsService } from './application/subscriptions.service';
import {
  SubscriptionDocument,
  SubscriptionSchema,
} from './infrastructure/persistence/subscription.schema';
import { SubscriptionsController } from './presentation/subscriptions.controller';
import { StripeWebhookController } from './presentation/stripe-webhook.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: SubscriptionDocument.name, schema: SubscriptionSchema },
    ]),
  ],
  controllers: [SubscriptionsController, StripeWebhookController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
