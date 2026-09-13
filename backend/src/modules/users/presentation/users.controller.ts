import { Body, Controller, Get, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { SWAGGER_BEARER_AUTH } from '../../../config/swagger.config';
import { RequestUser } from '../../../common/types/request-user';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { UpdateWealthTierDto } from '../application/dto/update-wealth-tier.dto';
import { UserResponseDto } from '../application/dto/user-response.dto';
import { UsersService } from '../application/users.service';

@ApiTags('Users')
@ApiBearerAuth(SWAGGER_BEARER_AUTH)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({ type: UserResponseDto })
  getMe(@CurrentUser() user: RequestUser & object) {
    return this.usersService.getProfile(user.userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiOkResponse({ type: UserResponseDto })
  updateMe(
    @CurrentUser() user: RequestUser & object,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(user.userId, dto);
  }

  @Patch('me/wealth-tier')
  @ApiOperation({
    summary: 'Update wealth tier label',
    description:
      'Accepts only a tier label computed on-device. No asset values or balances are stored.',
  })
  @ApiOkResponse({ type: UserResponseDto })
  updateWealthTier(
    @CurrentUser() user: RequestUser & object,
    @Body() dto: UpdateWealthTierDto,
  ) {
    return this.usersService.updateWealthTier(user.userId, dto.wealthTier);
  }
}
