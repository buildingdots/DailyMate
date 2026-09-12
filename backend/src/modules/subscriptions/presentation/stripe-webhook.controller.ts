import {
  BadRequestException,
  Controller,
  Headers,
  Post,
  Req,
} from '@nestjs/common';
import { ApiExcludeController, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '../../../common/decorators/public.decorator';
import { SubscriptionsService } from '../application/subscriptions.service';

@ApiTags('Webhooks')
@ApiExcludeController()
@Controller('webhooks/stripe')
export class StripeWebhookController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Stripe webhook endpoint (not for client use)' })
  @ApiHeader({ name: 'stripe-signature', required: true })
  handleWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('stripe-signature') signature: string,
  ) {
    if (!req.rawBody) {
      throw new BadRequestException('Missing raw body for webhook verification');
    }

    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    return this.subscriptionsService.handleStripeWebhook(
      req.rawBody,
      signature,
    );
  }
}
