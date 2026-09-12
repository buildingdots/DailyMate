export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  mongodbUri: process.env.MONGODB_URI,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
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
  appUrl: process.env.APP_URL ?? 'http://localhost:3000',
  swagger: {
    enabled: process.env.SWAGGER_ENABLED !== 'false',
  },
});
