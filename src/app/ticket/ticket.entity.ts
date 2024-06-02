import { Entity } from '../../core/Entity';

export interface TicketProps {
  roomId: string;
  seatId: string;
  ownerTo: string;
  movieSessionId: string;

  createdAt: Date;
  updatedAt: Date | null;
}

export class TicketEntity extends Entity<TicketProps> {
  get room(): string {
    return this.props.roomId;
  }

  set roomId(value: string) {
    this.props.roomId = value;
  }

  get seatId(): string {
    return this.props.seatId;
  }

  set seatId(value: string) {
    this.props.seatId = value;
  }

  get ownerTo(): string {
    return this.props.ownerTo;
  }

  set ownerTo(value: string) {
    this.props.ownerTo = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get movieSessionId(): string {
    return this.props.movieSessionId;
  }

  set movieSessionId(value: string) {
    this.props.movieSessionId = value;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  set updatedAt(value: Date | null) {
    this.props.updatedAt = value;
  }

  private constructor(props: TicketProps, id?: string) {
    super(props, id);
  }
  static create(props: TicketProps, id?: string) {
    props.updatedAt = props.updatedAt ?? null;

    return new TicketEntity(props, id);
  }
}
