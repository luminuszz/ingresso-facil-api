import { MovieEntity } from './movie.entity';
import { MovieSessionEntity } from '@app/movie/movie-session.entity';

export abstract class MovieRepository {
  abstract create(movie: MovieEntity): Promise<void>;
  abstract findById(id: string): Promise<MovieEntity | null>;
  abstract createMovieSession(data: MovieSessionEntity): Promise<void>;
  abstract findMovieSessionById(
    movieSessionId: string,
  ): Promise<MovieSessionEntity | null>;
}
