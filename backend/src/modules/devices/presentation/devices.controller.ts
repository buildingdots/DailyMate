import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SWAGGER_BEARER_AUTH } from '../../../config/swagger.config';
import { RequestUser } from '../../../common/types/request-user';
import { DevicesService } from '../application/devices.service';
import { DeviceResponseDto } from '../application/dto/device-response.dto';
import { RegisterDeviceDto } from '../application/dto/register-device.dto';
import { UpdateDeviceDto } from '../application/dto/update-device.dto';

@ApiTags('Devices')
@ApiBearerAuth(SWAGGER_BEARER_AUTH)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @ApiOperation({ summary: 'List registered devices for current user' })
  @ApiOkResponse({ type: DeviceResponseDto, isArray: true })
  list(@CurrentUser() user: RequestUser) {
    return this.devicesService.listDevices(user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Register or update a device' })
  @ApiOkResponse({ type: DeviceResponseDto })
  register(@CurrentUser() user: RequestUser, @Body() dto: RegisterDeviceDto) {
    return this.devicesService.registerDevice(user.userId, dto);
  }

  @Patch(':deviceId')
  @ApiOperation({ summary: 'Update device metadata or push token' })
  @ApiParam({ name: 'deviceId', description: 'Client-generated device identifier' })
  @ApiOkResponse({ type: DeviceResponseDto })
  update(
    @CurrentUser() user: RequestUser,
    @Param('deviceId') deviceId: string,
    @Body() dto: UpdateDeviceDto,
  ) {
    return this.devicesService.updateDevice(user.userId, deviceId, dto);
  }

  @Delete(':deviceId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove a registered device' })
  @ApiParam({ name: 'deviceId', description: 'Client-generated device identifier' })
  @ApiNoContentResponse()
  async remove(
    @CurrentUser() user: RequestUser,
    @Param('deviceId') deviceId: string,
  ) {
    await this.devicesService.removeDevice(user.userId, deviceId);
  }
}
