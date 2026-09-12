import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';

class HealthResponseDto {
  status: string;
  service: string;
  timestamp: string;
}

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @ApiOkResponse({
    description: 'Service is running',
    schema: {
      example: {
        status: 'ok',
        service: 'dailymate-api',
        timestamp: '2026-09-12T08:30:00.000Z',
      },
    },
  })
  check(): HealthResponseDto {
    return {
      status: 'ok',
      service: 'dailymate-api',
      timestamp: new Date().toISOString(),
    };
  }
}
