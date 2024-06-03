import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Validate } from './validators/zod-validation.pipe';
import { LoginDto, loginSchema } from './validators/auth.schema';
import { IsPublic } from '../auth/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('/login')
  @Validate(loginSchema)
  async makeLogin(@Body() dto: LoginDto) {
    return this.authService.makeLoginWithEmailAndPassword(
      dto.email,
      dto.password,
    );
  }
}
