import { UserEntity } from './user.entity';

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<void>;
  abstract save(user: UserEntity): Promise<void>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
}
