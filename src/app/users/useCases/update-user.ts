import { UseCaseImpl } from '@core/use-case-impl';
import { UserEntity, UserRole } from '@app/users/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/users/user-repository';
import {
  InvalidPermissionException,
  ResourceNotFoundException,
} from '@core/errors';
import { defineAbilityFor } from '@app/users/permissions';
import { HashProvider } from '@app/users/hash-provider';

interface UpdateUserProps {
  id: string;
  data: Partial<{
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }>;
}

type UpdateUserResponse = { user: UserEntity };

@Injectable()
export class UpdateUser
  implements UseCaseImpl<UpdateUserProps, UpdateUserResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({ data, id }: UpdateUserProps): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundException('User');
    }

    const { cannot } = defineAbilityFor(user);

    const userCannotUpdate = cannot('update', 'User');

    if (userCannotUpdate) {
      throw new InvalidPermissionException();
    }

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;

    if (data.password) {
      user.password = await this.hashProvider.hash(data.password);
    }

    if (data.role) {
      const userCannotChangeRole = cannot('change-role', 'User');

      if (userCannotChangeRole) {
        throw new InvalidPermissionException();
      }

      user.role = data.role;
    }

    await this.userRepository.save(user);

    return {
      user,
    };
  }
}
