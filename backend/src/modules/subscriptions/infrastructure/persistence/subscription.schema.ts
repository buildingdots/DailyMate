import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  SubscriptionPlan,
  SubscriptionStatus,
} from '../../domain/subscription-plan';

@Schema({ timestamps: true, collection: 'subscriptions' })
export class SubscriptionDocument {
  @Prop({ type: Types.ObjectId, ref: 'UserDocument', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ enum: SubscriptionPlan, default: SubscriptionPlan.Free })
  plan: SubscriptionPlan;

  @Prop({ enum: SubscriptionStatus, default: SubscriptionStatus.Active })
  status: SubscriptionStatus;

  @Prop()
  stripeCustomerId?: string;

  @Prop()
  stripeSubscriptionId?: string;

  @Prop()
  currentPeriodStart?: Date;

  @Prop()
  currentPeriodEnd?: Date;

  @Prop({ default: false })
  cancelAtPeriodEnd: boolean;
}

export type Subscription = HydratedDocument<SubscriptionDocument>;
export const SubscriptionSchema =
  SchemaFactory.createForClass(SubscriptionDocument);

SubscriptionSchema.index({ userId: 1 });
SubscriptionSchema.index({ stripeCustomerId: 1 });
SubscriptionSchema.index({ stripeSubscriptionId: 1 });
