import { Body, Controller, Post, Put } from '@nestjs/common';
import { CreateUser } from '@app/users/useCases/create-user';
import { Validate } from '../validators/zod-validation.pipe';
import {
  CreateUserDto,
  createUserSchema,
  UpdateUserDto,
  UpdateUserRoleDto,
  updateUserRoleSchema,
  updateUserSchema,
} from '../validators/users.schema';
import { IsPublic, ProtectedFor, User } from '../../auth/guards/decorators';
import { UpdateUser } from '@app/users/useCases/update-user';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUser,
    private updateUserUseCase: UpdateUser,
  ) {}

  @IsPublic()
  @Post()
  @Validate(createUserSchema)
  async createUser(@Body() user: CreateUserDto) {
    await this.createUserUseCase.execute(user);
  }

  @Put('/update')
  @Validate(updateUserSchema)
  async updateUser(@Body() dto: UpdateUserDto, @User('id') userId: string) {
    await this.updateUserUseCase.execute({
      id: userId,
      data: {
        name: dto.name,
        password: dto.password,
        email: dto.email,
      },
    });
  }

  @ProtectedFor('ADMIN')
  @Validate(updateUserRoleSchema)
  @Put('/update-role')
  async updateRole(@Body() dto: UpdateUserRoleDto, @User('id') userId: string) {
    await this.updateUserUseCase.execute({
      id: userId,
      data: {
        role: dto.role,
      },
    });
  }
}
