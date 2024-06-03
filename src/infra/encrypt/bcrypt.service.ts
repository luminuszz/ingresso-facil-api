import { hash, compare } from 'bcrypt';

import { HashProvider } from '@app/users/hash-provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService implements HashProvider {
  hash(value: string): Promise<string> {
    return hash(value, 10);
  }
  compare(value: string, hashed: string): Promise<boolean> {
    return compare(value, hashed);
  }
}
