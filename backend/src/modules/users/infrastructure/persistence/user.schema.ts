import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AuthProviderType } from '../../domain/auth-provider';
import { UserStatus } from '../../domain/user-status';
import { WealthTier } from '../../domain/wealth-tier';

@Schema({ _id: false })
export class AuthProviderSchema {
  @Prop({ type: String, required: true, enum: AuthProviderType })
  provider: AuthProviderType;

  @Prop()
  providerId?: string;

  @Prop({ required: true, default: () => new Date() })
  linkedAt: Date;
}

@Schema({ timestamps: true, collection: 'users' })
export class UserDocument {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ trim: true })
  phone?: string;

  @Prop()
  avatarUrl?: string;

  @Prop()
  passwordHash?: string;

  @Prop({ type: [AuthProviderSchema], default: [] })
  authProviders: AuthProviderSchema[];

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  emailVerificationDeadlineAt?: Date;

  @Prop()
  emailVerificationExpiredAt?: Date;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  @Prop({ type: String, enum: WealthTier })
  wealthTier?: WealthTier;

  @Prop()
  wealthTierUpdatedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type User = HydratedDocument<UserDocument>;
export const UserSchema = SchemaFactory.createForClass(UserDocument);

UserSchema.index({ status: 1 });
UserSchema.index({
  emailVerified: 1,
  status: 1,
  emailVerificationDeadlineAt: 1,
});
