import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CheckoutResponseDto {
  @ApiPropertyOptional({ description: 'Stripe Checkout URL to open in browser' })
  checkoutUrl: string | null;

  @ApiProperty()
  sessionId: string;
}
