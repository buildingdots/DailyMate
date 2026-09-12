import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SWAGGER_BEARER_AUTH } from '../../../config/swagger.config';
import { RequestUser } from '../../../common/types/request-user';
import { CreateCheckoutDto } from '../application/dto/checkout.dto';
import { CheckoutResponseDto } from '../application/dto/checkout-response.dto';
import { SubscriptionResponseDto } from '../application/dto/subscription-response.dto';
import { SubscriptionsService } from '../application/subscriptions.service';

@ApiTags('Subscriptions')
@ApiBearerAuth(SWAGGER_BEARER_AUTH)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current subscription status' })
  @ApiOkResponse({ type: SubscriptionResponseDto })
  getMySubscription(@CurrentUser() user: RequestUser & object) {
    return this.subscriptionsService.getForUser(user.userId);
  }

  @Post('checkout')
  @ApiOperation({
    summary: 'Create Stripe Checkout session',
    description: 'Supported plans: pro_monthly, pro_yearly',
  })
  @ApiOkResponse({ type: CheckoutResponseDto })
  createCheckout(
    @CurrentUser() user: RequestUser & object,
    @Body() dto: CreateCheckoutDto,
  ) {
    return this.subscriptionsService.createCheckoutSession(user.userId, dto.plan);
  }
}
