export class UserAlreadyExists extends Error {
  constructor() {
    super('UserEntity already exists');
  }
}
