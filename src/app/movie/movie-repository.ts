import { MovieEntity } from './movie.entity';
import { MovieSessionEntity } from '@app/movie/movie-session.entity';
import { SeatEntity } from '@app/room/seat.entity';

export type SeatEntityWithSeatStatus = SeatEntity & { isOccupied: boolean };

export abstract class MovieRepository {
  abstract create(movie: MovieEntity): Promise<void>;
  abstract findById(id: string): Promise<MovieEntity | null>;
  abstract createMovieSession(data: MovieSessionEntity): Promise<void>;
  abstract findMovieSessionById(movieSessionId: string): Promise<any>;

  abstract listMovieSessionSeats(
    movieSessionId: string,
  ): Promise<SeatEntityWithSeatStatus[]>;
}
