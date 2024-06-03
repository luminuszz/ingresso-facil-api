import { UseCaseImpl } from '@core/use-case-impl';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/users/user-repository';
import { HashProvider } from '@app/users/hash-provider';
import { UserEntity } from '@app/users/user.entity';

interface ValidateUserRequest {
  email: string;
  password: string;
}

type Response = { isValid: true; user: UserEntity } | { isValid: false };

@Injectable()
export class ValidateUser
  implements UseCaseImpl<ValidateUserRequest, Response>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({ password, email }: ValidateUserRequest): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return { isValid: false };
    }

    const isValid = await this.hashProvider.compare(password, user.password);

    return {
      isValid,
      user,
    };
  }
}
