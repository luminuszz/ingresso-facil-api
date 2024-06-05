import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateUser } from '@app/users/useCases/validate-user';
import { AuthUserTokenPayload } from './dto';
import { UserRole } from '@app/users/user.entity';
import { ValidateUserRole } from '@app/users/useCases/validate-user-role';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validateUser: ValidateUser,
    private readonly validateUserRole: ValidateUserRole,
  ) {}

  async makeLoginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    const response = await this.validateUser.execute({ email, password });

    if (!response.isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { user } = response;

    const payload = {
      email: user.email,
      name: user.name,
      id: user.id,
      role: user.role,
      __typename: user.__typename,
    } satisfies AuthUserTokenPayload;

    const token = this.jwtService.sign(payload, { expiresIn: '3d' });

    return { token };
  }

  async checkUserRole(userId: string, roleTo: UserRole): Promise<boolean> {
    const { isValid } = await this.validateUserRole.execute({
      userId,
      role: roleTo,
    });

    return isValid;
  }
}
