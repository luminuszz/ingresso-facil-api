import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from '../../app/users/use-cases/create-user';
import { ZodValidationPipe } from './validators/zod-validation.pipe';
import { CreateUserDto, createUserSchema } from './validators/users-schema';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUser) {}

  @Post()
  async createUser(
    @Body(new ZodValidationPipe(createUserSchema)) user: CreateUserDto,
  ) {
    await this.createUserUseCase.execute(user);
  }
}
