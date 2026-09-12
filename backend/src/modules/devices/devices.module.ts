import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesService } from './application/devices.service';
import {
  UserDeviceDocument,
  UserDeviceSchema,
} from './infrastructure/persistence/device.schema';
import { DevicesController } from './presentation/devices.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserDeviceDocument.name, schema: UserDeviceSchema },
    ]),
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
