import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from '../../app/users/useCases/create-user';
import { Validate } from './validators/zod-validation.pipe';
import { CreateUserDto, createUserSchema } from './validators/users.schema';
import { IsPublic } from '../auth/decorators';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUser) {}

  @IsPublic()
  @Post()
  @Validate(createUserSchema)
  async createUser(@Body() user: CreateUserDto) {
    await this.createUserUseCase.execute(user);
  }
}
