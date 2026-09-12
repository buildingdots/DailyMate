import { User } from '../../infrastructure/persistence/user.schema';
import { UserResponseDto } from '../dto/user-response.dto';

export function toUserResponse(user: User): UserResponseDto {
  return {
    id: user._id.toString(),
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    avatarUrl: user.avatarUrl,
    emailVerified: user.emailVerified,
    status: user.status,
    authProviders: user.authProviders.map((p) => p.provider),
    wealthTier: user.wealthTier,
    wealthTierUpdatedAt: user.wealthTierUpdatedAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
