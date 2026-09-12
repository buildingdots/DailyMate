import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { DevicesModule } from '../devices/devices.module';
import { AuthService } from './application/auth.service';
import {
  RefreshTokenDocument,
  RefreshTokenSchema,
} from './infrastructure/persistence/refresh-token.schema';
import { OAuthService } from './infrastructure/oauth/oauth.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [
    UsersModule,
    SubscriptionsModule,
    DevicesModule,
    MongooseModule.forFeature([
      { name: RefreshTokenDocument.name, schema: RefreshTokenSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.accessSecret'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, OAuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
