import { UseCaseImpl } from '@core/use-case-impl';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/users/user-repository';
import { UserRole } from '@app/users/user.entity';

interface ValidateUseRoleRequest {
  userId: string;
  role: UserRole;
}

type Response = { isValid: boolean };

@Injectable()
export class ValidateUserRole
  implements UseCaseImpl<ValidateUseRoleRequest, Response>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ userId, role }: ValidateUseRoleRequest): Promise<Response> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return { isValid: false };
    }

    const isValid = user.role === role;

    return {
      isValid,
    };
  }
}
