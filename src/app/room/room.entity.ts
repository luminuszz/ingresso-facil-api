import { Entity } from '@core/Entity';

export enum RoomType {
  IMAX = 'IMAX',
  VIP = 'VIP',
  STANDARD = 'STANDARD',
}

export interface RoomProps {
  number: number;
  type: RoomType;
  createdAt: Date;
  updatedAt: Date | null;
}

export class RoomEntity extends Entity<RoomProps> {
  get number(): number {
    return this.props.number;
  }

  set number(value: number) {
    this.props.number = value;
  }

  get type(): RoomType {
    return this.props.type;
  }

  set type(value: RoomType) {
    this.props.type = value;
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

  private constructor(props: RoomProps, id?: string) {
    super(props, id);

    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? null;
  }

  static create(props: RoomProps, id?: string) {
    return new RoomEntity(props, id);
  }
}
