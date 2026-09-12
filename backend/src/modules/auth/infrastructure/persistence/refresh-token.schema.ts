import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'refresh_tokens' })
export class RefreshTokenDocument {
  @Prop({ type: Types.ObjectId, ref: 'UserDocument', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  tokenHash: string;

  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: false })
  revoked: boolean;

  @Prop()
  revokedAt?: Date;
}

export type RefreshToken = HydratedDocument<RefreshTokenDocument>;
export const RefreshTokenSchema =
  SchemaFactory.createForClass(RefreshTokenDocument);

RefreshTokenSchema.index({ userId: 1, deviceId: 1 });
RefreshTokenSchema.index({ tokenHash: 1 });
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
