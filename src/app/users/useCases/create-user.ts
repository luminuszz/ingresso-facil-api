import { UserEntity, UserRole } from '../user.entity';
import { UseCaseImpl } from '@core/use-case-impl';
import { UserRepository } from '../user-repository';
import { HashProvider } from '../hash-provider';
import { Injectable } from '@nestjs/common';
import { UserAlreadyExists } from '../exceptions';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

type CreateUserResponse = { user: UserEntity };

@Injectable()
export class CreateUser
  implements UseCaseImpl<CreateUserRequest, CreateUserResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({
    name,
    password,
    email,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const existsUserWithEmail = await this.userRepository.findByEmail(email);

    if (existsUserWithEmail) {
      throw new UserAlreadyExists();
    }

    const user = UserEntity.create({
      name,
      password: await this.hashProvider.hash(password),
      email,
      createdAt: new Date(),
      updatedAt: null,
      role: UserRole.USER,
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
