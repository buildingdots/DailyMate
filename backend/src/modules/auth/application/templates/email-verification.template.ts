import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';

interface EmailVerificationTemplateInput {
  deadlineAt: Date;
  tokenExpiresAt: Date;
  verificationUrl: string;
}

interface EmailVerificationTemplateView {
  accountDeadlineText: string;
  currentYear: number;
  tokenExpiryText: string;
  verificationUrl: string;
}

const verificationHtmlTemplate =
  Handlebars.compile<EmailVerificationTemplateView>(
    readFileSync(join(__dirname, 'email-verification.hbs'), 'utf8'),
  );

const verificationTextTemplate =
  Handlebars.compile<EmailVerificationTemplateView>(`Verify your DailyMate email address

Click the verification link below to confirm your email address.
This link expires at {{tokenExpiryText}}.
Your account must be verified by {{accountDeadlineText}}.

Verify here: {{verificationUrl}}

DailyMate never asks for your NetBanking credentials or passwords.
If you did not request this verification email, you can safely ignore it.`);

export function renderEmailVerificationHtml(
  input: EmailVerificationTemplateInput,
): string {
  return verificationHtmlTemplate(toTemplateView(input));
}

export function renderEmailVerificationText(
  input: EmailVerificationTemplateInput,
): string {
  return verificationTextTemplate(toTemplateView(input));
}

function toTemplateView(
  input: EmailVerificationTemplateInput,
): EmailVerificationTemplateView {
  return {
    accountDeadlineText: formatDate(input.deadlineAt),
    currentYear: new Date().getFullYear(),
    tokenExpiryText: formatDate(input.tokenExpiresAt),
    verificationUrl: input.verificationUrl,
  };
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(date);
}
