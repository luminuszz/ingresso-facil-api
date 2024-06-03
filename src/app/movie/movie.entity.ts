import { Entity } from '@core/Entity';

export interface MovieProps {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class MovieEntity extends Entity<MovieProps> {
  private constructor(props: MovieProps, id?: string) {
    props.createdAt = props.createdAt ?? new Date();
    props.updatedAt = props.updatedAt ?? null;
    super(props, id);
  }

  static create(props: MovieProps, id?: string): MovieEntity {
    return new MovieEntity(props, id);
  }

  get title(): string {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
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
}
