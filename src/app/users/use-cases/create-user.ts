import { User } from '../user';
import { UseCaseImpl } from '../../../core/use-case-impl';
import { UserRepository } from '../user-repository';
import { HashProvider } from '../hash-provider';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserAlreadyExists } from '../errors';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

type CreateUserResponse = { user: User };

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

    const user = User.create({
      name,
      password: await this.hashProvider.hash(password),
      email,
      createdAt: new Date(),
      updatedAt: null,
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
