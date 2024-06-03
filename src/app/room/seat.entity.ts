import { Entity } from '@core/Entity';

export interface SeatProps {
  number: number;
  roomId: string;

  createdAt: Date;
  updatedAt: Date | null;
}

export class SeatEntity extends Entity<SeatProps> {
  get number(): number {
    return this.props.number;
  }

  set number(value: number) {
    this.props.number = value;
  }

  get roomId(): string {
    return this.props.roomId;
  }

  set roomId(value: string) {
    this.props.roomId = value;
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

  set updatedAt(value: Date | null) {
    this.props.updatedAt = value;
  }

  private constructor(props: SeatProps, id?: string) {
    super(props, id);

    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? null;
  }

  static create(props: SeatProps, id?: string) {
    return new SeatEntity(props, id);
  }
}
