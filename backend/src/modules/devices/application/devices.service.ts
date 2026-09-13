import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DevicePlatform } from '../domain/device-platform';
import {
  UserDevice,
  UserDeviceDocument,
} from '../infrastructure/persistence/device.schema';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(UserDeviceDocument.name)
    private readonly deviceModel: Model<UserDevice>,
  ) {}

  async touchDevice(
    userId: string,
    deviceId: string,
    platform: DevicePlatform,
  ): Promise<void> {
    await this.deviceModel.updateOne(
      { userId: new Types.ObjectId(userId), deviceId },
      {
        $set: { lastActiveAt: new Date(), isActive: true },
        $setOnInsert: {
          userId: new Types.ObjectId(userId),
          deviceId,
          platform,
        },
      },
      { upsert: true },
    );
  }

  async registerDevice(userId: string, dto: RegisterDeviceDto) {
    const device = await this.deviceModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId), deviceId: dto.deviceId },
      {
        userId: new Types.ObjectId(userId),
        deviceId: dto.deviceId,
        platform: dto.platform,
        deviceName: dto.deviceName,
        osVersion: dto.osVersion,
        appVersion: dto.appVersion,
        pushToken: dto.pushToken,
        isActive: true,
        lastActiveAt: new Date(),
      },
      { upsert: true, new: true },
    );

    return this.toResponse(device);
  }

  async listDevices(userId: string) {
    const devices = await this.deviceModel
      .find({ userId: new Types.ObjectId(userId), isActive: true })
      .sort({ lastActiveAt: -1 });

    return devices.map((d) => this.toResponse(d));
  }

  async updateDevice(userId: string, deviceId: string, dto: UpdateDeviceDto) {
    const device = await this.deviceModel.findOne({
      userId: new Types.ObjectId(userId),
      deviceId,
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    if (dto.deviceName !== undefined) device.deviceName = dto.deviceName;
    if (dto.osVersion !== undefined) device.osVersion = dto.osVersion;
    if (dto.appVersion !== undefined) device.appVersion = dto.appVersion;
    if (dto.pushToken !== undefined) device.pushToken = dto.pushToken;
    device.lastActiveAt = new Date();

    await device.save();
    return this.toResponse(device);
  }

  async deactivateDevice(userId: string, deviceId: string): Promise<void> {
    await this.deviceModel.updateOne(
      { userId: new Types.ObjectId(userId), deviceId },
      { isActive: false },
    );
  }

  async removeDevice(userId: string, deviceId: string): Promise<void> {
    const result = await this.deviceModel.deleteOne({
      userId: new Types.ObjectId(userId),
      deviceId,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Device not found');
    }
  }

  private toResponse(device: UserDevice) {
    return {
      id: device._id.toString(),
      deviceId: device.deviceId,
      platform: device.platform,
      deviceName: device.deviceName,
      osVersion: device.osVersion,
      appVersion: device.appVersion,
      hasPushToken: Boolean(device.pushToken),
      isActive: device.isActive,
      lastActiveAt: device.lastActiveAt,
      registeredAt: device.createdAt,
    };
  }
}
