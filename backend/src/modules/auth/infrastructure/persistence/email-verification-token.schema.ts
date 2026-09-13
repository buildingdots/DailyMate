import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'email_verification_tokens' })
export class EmailVerificationTokenDocument {
  @Prop({
    type: Types.ObjectId,
    ref: 'UserDocument',
    required: true,
    unique: true,
  })
  userId: Types.ObjectId;

  @Prop({ required: true })
  tokenHash: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ required: true })
  sentAt: Date;
}

export type EmailVerificationToken =
  HydratedDocument<EmailVerificationTokenDocument>;
export const EmailVerificationTokenSchema = SchemaFactory.createForClass(
  EmailVerificationTokenDocument,
);

EmailVerificationTokenSchema.index({ sentAt: 1 });
EmailVerificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
