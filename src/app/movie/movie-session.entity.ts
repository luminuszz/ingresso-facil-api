import { Entity } from '@core/Entity';

export interface MovieSessionProps {
  movieId: string;
  roomId: string;
  startsAt: Date;
  endsAt: Date;

  price: number;

  createdAt: Date;
  updatedAt: Date | null;
}

export class MovieSessionEntity extends Entity<MovieSessionProps> {
  private constructor(props: MovieSessionProps, id?: string) {
    super(props, id);
  }

  static create(props: MovieSessionProps, id?: string): MovieSessionEntity {
    return new MovieSessionEntity(props, id);
  }

  get movieId(): string {
    return this.props.movieId;
  }

  set movieId(value: string) {
    this.props.movieId = value;
  }

  get roomId(): string {
    return this.props.roomId;
  }

  set roomId(value: string) {
    this.props.roomId = value;
  }

  get startsAt(): Date {
    return this.props.startsAt;
  }

  set startsAt(value: Date) {
    this.props.startsAt = value;
  }

  get endsAt(): Date {
    return this.props.endsAt;
  }

  set endsAt(value: Date) {
    this.props.endsAt = value;
  }

  get price(): number {
    return this.props.price;
  }

  set price(value: number) {
    this.props.price = value;
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
