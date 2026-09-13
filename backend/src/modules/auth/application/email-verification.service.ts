import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { createHash, randomBytes } from 'crypto';
import { Model, Types } from 'mongoose';
import { AuthProviderType } from '../../users/domain/auth-provider';
import { UserStatus } from '../../users/domain/user-status';
import { UsersService } from '../../users/application/users.service';
import { User } from '../../users/infrastructure/persistence/user.schema';
import {
  EmailVerificationToken,
  EmailVerificationTokenDocument,
} from '../infrastructure/persistence/email-verification-token.schema';
import { EmailDeliveryService } from './email-delivery.service';

const DAY_MS = 24 * 60 * 60 * 1000;
const VERIFICATION_WINDOW_DAYS = 15;
const REMINDER_INTERVAL_DAYS = 3;

export interface EmailVerificationRequiredResponse {
  email: string;
  message: string;
  emailVerificationDeadlineAt: Date;
  nextReminderAt?: Date;
}

@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger(EmailVerificationService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly emailDeliveryService: EmailDeliveryService,
    private readonly configService: ConfigService,
    @InjectModel(EmailVerificationTokenDocument.name)
    private readonly verificationTokenModel: Model<EmailVerificationToken>,
  ) {}

  @Cron('0 10 * * *', {
    name: 'email-verification-daily-sweep',
    timeZone: 'Asia/Kolkata',
  })
  async processPendingEmailVerificationsCron(): Promise<void> {
    const enabled = this.configService.get<string>(
      'email.verificationCronEnabled',
      'true',
    );

    if (enabled === 'false') {
      return;
    }

    this.logger.log('Running daily email verification sweep');
    await this.processPendingEmailVerifications();
  }

  async start(user: User): Promise<EmailVerificationRequiredResponse> {
    if (user.emailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const now = new Date();
    const deadlineAt =
      user.emailVerificationDeadlineAt ??
      new Date(now.getTime() + VERIFICATION_WINDOW_DAYS * DAY_MS);

    user.emailVerificationDeadlineAt = deadlineAt;
    await this.sendVerificationLink(user, now);

    return this.toRequiredResponse(user);
  }

  async resend(email: string): Promise<EmailVerificationRequiredResponse> {
    const user = await this.findEmailUser(email);
    await this.assertVerificationStillAllowed(user);
    await this.sendVerificationLink(user, new Date());

    return this.toRequiredResponse(user);
  }

  async verifyByToken(token: string): Promise<User> {
    const verificationToken = await this.verificationTokenModel.findOne({
      tokenHash: this.hashToken(token),
    });

    if (!verificationToken || verificationToken.expiresAt <= new Date()) {
      throw new BadRequestException('Verification link has expired');
    }

    const user = await this.usersService.findById(
      verificationToken.userId.toString(),
    );
    if (!user || !this.isEmailPasswordUser(user)) {
      await verificationToken.deleteOne();
      throw new BadRequestException('Verification link is invalid');
    }
    await this.assertVerificationStillAllowed(user);

    user.emailVerified = true;
    user.emailVerificationDeadlineAt = undefined;
    user.emailVerificationExpiredAt = undefined;
    if (user.status === UserStatus.EmailVerificationExpired) {
      user.status = UserStatus.Active;
    }
    await Promise.all([
      user.save(),
      this.verificationTokenModel.deleteOne({ userId: user._id }),
    ]);

    return user;
  }

  async assertCanAuthenticate(user: User): Promise<void> {
    if (user.status === UserStatus.Deleted) {
      throw new UnauthorizedException('Account is not available');
    }

    if (this.isEmailPasswordUser(user) && !user.emailVerified) {
      await this.assertVerificationStillAllowed(user);
      throw new UnauthorizedException('Email verification required');
    }

    if (user.status === UserStatus.EmailVerificationExpired) {
      throw new UnauthorizedException('Email verification window has expired');
    }

    if (user.status === UserStatus.Suspended) {
      throw new UnauthorizedException('Account is suspended');
    }
  }

  async processPendingEmailVerifications(): Promise<void> {
    const now = new Date();
    const reminderBefore = new Date(
      now.getTime() - REMINDER_INTERVAL_DAYS * DAY_MS,
    );

    const expiredUsers =
      await this.usersService.findExpiredEmailVerificationUsers(now);
    await Promise.all(expiredUsers.map((user) => this.expireUser(user)));

    const reminderTokens = await this.verificationTokenModel
      .find({ sentAt: { $lte: reminderBefore } })
      .limit(100);

    await Promise.all(
      reminderTokens.map(async (verificationToken) => {
        const user = await this.usersService.findById(
          verificationToken.userId.toString(),
        );
        if (!user || !this.isEmailPasswordUser(user)) {
          await verificationToken.deleteOne();
          return;
        }
        if (
          user.emailVerified ||
          user.status !== UserStatus.Active ||
          !user.emailVerificationDeadlineAt
        ) {
          return;
        }
        if (user.emailVerificationDeadlineAt <= now) {
          await this.expireUser(user);
          return;
        }

        await this.sendVerificationLink(user, now);
      }),
    );
  }

  private async findEmailUser(email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !this.isEmailPasswordUser(user)) {
      throw new BadRequestException('Email verification is not available');
    }
    return user;
  }

  private async assertVerificationStillAllowed(user: User): Promise<void> {
    if (user.emailVerified) {
      return;
    }

    const now = new Date();
    const deadlineAt = user.emailVerificationDeadlineAt;
    if (
      user.status === UserStatus.EmailVerificationExpired ||
      (deadlineAt && deadlineAt <= now)
    ) {
      await this.expireUser(user);
      throw new UnauthorizedException('Email verification window has expired');
    }
  }

  private async sendVerificationLink(user: User, now: Date): Promise<void> {
    const deadlineAt =
      user.emailVerificationDeadlineAt ??
      new Date(now.getTime() + VERIFICATION_WINDOW_DAYS * DAY_MS);
    const token = this.generateToken();
    const tokenExpiresAt = new Date(
      Math.min(
        now.getTime() + REMINDER_INTERVAL_DAYS * DAY_MS,
        deadlineAt.getTime(),
      ),
    );

    user.emailVerificationDeadlineAt = deadlineAt;
    await Promise.all([
      user.save(),
      this.verificationTokenModel.findOneAndUpdate(
        { userId: user._id },
        {
          userId: new Types.ObjectId(user._id.toString()),
          tokenHash: this.hashToken(token),
          expiresAt: tokenExpiresAt,
          sentAt: now,
        },
        { upsert: true, new: true },
      ),
    ]);
    await this.emailDeliveryService.sendEmailVerificationLink(
      user.email,
      token,
      tokenExpiresAt,
      deadlineAt,
    );
  }

  private async expireUser(user: User): Promise<void> {
    if (user.emailVerified) {
      return;
    }

    user.status = UserStatus.EmailVerificationExpired;
    user.emailVerificationExpiredAt =
      user.emailVerificationExpiredAt ?? new Date();
    await Promise.all([
      user.save(),
      this.verificationTokenModel.deleteOne({ userId: user._id }),
    ]);
  }

  private isEmailPasswordUser(user: User): boolean {
    return user.authProviders.some(
      (p) => p.provider === AuthProviderType.Email,
    );
  }

  private toRequiredResponse(user: User): EmailVerificationRequiredResponse {
    return {
      email: user.email,
      message: 'Email verification required',
      emailVerificationDeadlineAt:
        user.emailVerificationDeadlineAt ??
        new Date(Date.now() + VERIFICATION_WINDOW_DAYS * DAY_MS),
      nextReminderAt: this.getNextReminderAt(user),
    };
  }

  private getNextReminderAt(user: User): Date | undefined {
    const deadlineAt = user.emailVerificationDeadlineAt;
    if (!deadlineAt) {
      return undefined;
    }

    const nextReminderAt = new Date(
      Date.now() + REMINDER_INTERVAL_DAYS * DAY_MS,
    );

    return nextReminderAt < deadlineAt ? nextReminderAt : undefined;
  }

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
