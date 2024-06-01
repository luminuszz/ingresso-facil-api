import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { HashProvider } from '../../app/users/hash-provider';

@Module({
  providers: [{ provide: HashProvider, useClass: BcryptService }],
  exports: [HashProvider],
})
export class EncryptModule {}
