export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  mongodbUri: process.env.MONGODB_URI,
  mongodb: {
    dbName: process.env.MONGODB_DB_NAME ?? 'dailymate',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
  },
  oauth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    appleClientId: process.env.APPLE_CLIENT_ID,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    proMonthlyPriceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
    proYearlyPriceId: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
  },
  email: {
    from: process.env.EMAIL_FROM ?? 'DailyMate <no-reply@dailymate.app>',
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT ?? '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    verificationCronEnabled:
      process.env.EMAIL_VERIFICATION_CRON_ENABLED ?? 'true',
  },
  apiPublicUrl:
    process.env.API_PUBLIC_URL ??
    process.env.APP_URL ??
    'http://localhost:3000',
  appUrl: process.env.APP_URL ?? 'http://localhost:3000',
  swagger: {
    enabled: process.env.SWAGGER_ENABLED !== 'false',
  },
});
