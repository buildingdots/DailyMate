import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';
import {
  renderEmailVerificationHtml,
  renderEmailVerificationText,
} from './templates/email-verification.template';

interface SmtpConfig {
  host?: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
}

@Injectable()
export class EmailDeliveryService {
  private readonly logger = new Logger(EmailDeliveryService.name);
  private transporter?: Transporter;

  constructor(private readonly configService: ConfigService) {}

  async sendEmailVerificationLink(
    email: string,
    token: string,
    tokenExpiresAt: Date,
    deadlineAt: Date,
  ): Promise<void> {
    const verificationUrl = this.buildVerificationUrl(token);
    const html = renderEmailVerificationHtml({
      tokenExpiresAt,
      deadlineAt,
      verificationUrl,
    });
    const text = renderEmailVerificationText({
      tokenExpiresAt,
      deadlineAt,
      verificationUrl,
    });
    const transporter = this.getTransporter();

    if (!transporter) {
      this.logger.log(
        `Email verification for ${email}: url=${verificationUrl}, verifyBy=${deadlineAt.toISOString()}`,
      );
      return;
    }

    try {
      await transporter.sendMail({
        from: this.configService.get<string>(
          'email.from',
          'DailyMate <no-reply@dailymate.app>',
        ),
        to: email,
        subject: 'Verify your DailyMate email',
        html,
        text,
      });
    } catch (error) {
      this.logger.error(
        `Failed to send verification email to ${email}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw new InternalServerErrorException(
        'Unable to send verification email',
      );
    }

    this.logger.log(
      `Sent verification email to ${email}, verifyBy=${deadlineAt.toISOString()}`,
    );
  }

  private getTransporter(): Transporter | undefined {
    if (this.transporter) {
      return this.transporter;
    }

    const smtp = this.configService.get<SmtpConfig>('email.smtp');
    if (!smtp?.host) {
      return undefined;
    }

    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth:
        smtp.user && smtp.pass
          ? {
              user: smtp.user,
              pass: smtp.pass,
            }
          : undefined,
    });

    return this.transporter;
  }

  private buildVerificationUrl(token: string): string {
    const apiPublicUrl = this.configService.get<string>(
      'apiPublicUrl',
      'http://localhost:3000',
    );
    const url = new URL('/api/v1/auth/verify-email', apiPublicUrl);
    url.searchParams.set('token', token);

    return url.toString();
  }
}
