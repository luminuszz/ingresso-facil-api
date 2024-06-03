import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ValidateUser } from '@app/users/useCases/validate-user';
import { PrismaModule } from '../database/prisma.module';
import { EncryptModule } from '../encrypt/encrypt.module';
import { FindUserById } from '@app/users/useCases/find-user-by-id';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { ValidateUserRole } from '@app/users/useCases/validate-user-role';

@Module({
  imports: [
    PrismaModule,
    EncryptModule,
    JwtModule.register({
      secret: '34hh234h23h4h234h234',
      global: true,
      signOptions: {
        expiresIn: '3d',
      },
    }),
  ],
  providers: [
    AuthService,
    ValidateUser,
    FindUserById,
    AuthGuard,
    RoleGuard,
    ValidateUserRole,
  ],
  exports: [
    AuthService,
    ValidateUser,
    FindUserById,
    AuthGuard,
    RoleGuard,
    ValidateUserRole,
  ],
})
export class AuthModule {}
