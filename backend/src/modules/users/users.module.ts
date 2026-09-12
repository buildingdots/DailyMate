import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './application/users.service';
import {
  UserDocument,
  UserSchema,
} from './infrastructure/persistence/user.schema';
import { UsersController } from './presentation/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
