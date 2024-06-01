interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class User {
  private _name: string;
  private _email: string;
  private _password: string;

  private readonly _id: string;

  private _createdAt: Date;
  private _updatedAt: Date | null;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  private constructor(props: UserProps, id?: string) {
    this._email = props.email;
    this._name = props.name;
    this._password = props.password;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? null;
    if (id) {
      this._id = id;
    }
  }

  static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date | null {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
