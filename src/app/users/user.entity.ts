import { Entity } from '@core/Entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}

interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
  role: UserRole;
}

export class UserEntity extends Entity<UserProps> {
  public __typename = 'User' as const;

  get name(): string {
    return this.props.name;
  }

  get role(): UserRole {
    return this.props.role;
  }

  set role(value: UserRole) {
    this.props.role = value;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get password(): string {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
  }

  private constructor(props: UserProps, id?: string) {
    super(props, id);
    this.props.email = props.email;
    this.props.name = props.name;
    this.props.password = props.password;
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? null;
  }

  static create(props: UserProps, id?: string): UserEntity {
    return new UserEntity(props, id);
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  set updatedAt(value: Date) {
    this.props.updatedAt = value;
  }
}
