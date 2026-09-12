import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { DevicePlatform } from '../../domain/device-platform';

@Schema({ timestamps: true, collection: 'user_devices' })
export class UserDeviceDocument {
  @Prop({ type: Types.ObjectId, ref: 'UserDocument', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true, enum: DevicePlatform })
  platform: DevicePlatform;

  @Prop()
  deviceName?: string;

  @Prop()
  osVersion?: string;

  @Prop()
  appVersion?: string;

  @Prop()
  pushToken?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: () => new Date() })
  lastActiveAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type UserDevice = HydratedDocument<UserDeviceDocument>;
export const UserDeviceSchema =
  SchemaFactory.createForClass(UserDeviceDocument);

UserDeviceSchema.index({ userId: 1, deviceId: 1 }, { unique: true });
UserDeviceSchema.index({ userId: 1, isActive: 1 });
