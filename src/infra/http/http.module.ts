import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUser } from '../../app/users/use-cases/create-user';
import { EncryptModule } from '../encrypt/encrypt.module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule, EncryptModule],
  providers: [CreateUser],
  controllers: [UserController],
})
export class HttpModule {}
