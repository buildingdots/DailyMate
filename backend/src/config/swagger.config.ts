import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SWAGGER_BEARER_AUTH = 'access-token';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
): void {
  const enabled = configService.get<boolean>('swagger.enabled', true);
  if (!enabled) {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle('DailyMate API')
    .setDescription(
      'Authentication, subscription, and account management API for DailyMate. Financial data is never stored on this backend.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter the JWT access token',
      },
      SWAGGER_BEARER_AUTH,
    )
    .addTag('Health', 'Service health checks')
    .addTag('Auth', 'Registration, login, and session management')
    .addTag('Users', 'User profile and wealth tier')
    .addTag('Subscriptions', 'Subscription status and Stripe checkout')
    .addTag('Devices', 'Registered devices and push tokens')
    .addTag('Webhooks', 'External provider webhooks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
