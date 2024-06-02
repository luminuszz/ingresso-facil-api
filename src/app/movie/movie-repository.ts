import { MovieEntity } from './movie.entity';

export abstract class MovieRepository {
  abstract create(movie: MovieEntity): Promise<void>;
  abstract findById(id: string): Promise<MovieEntity | null>;
}
