import { UseCaseImpl } from '@core/use-case-impl';
import { MovieSessionEntity } from '@app/movie/movie-session.entity';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '@app/movie/movie-repository';
import { isAfter } from 'date-fns';

interface CreateMovieSessionRequest {
  movieId: string;
  roomId: string;
  startsAt: Date;
  endsAt: Date;
  price: number;
}

@Injectable()
export class CreateMovieSession
  implements
    UseCaseImpl<
      CreateMovieSessionRequest,
      { movieSession: MovieSessionEntity }
    >
{
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(
    request: CreateMovieSessionRequest,
  ): Promise<{ movieSession: MovieSessionEntity }> {
    const isValidPeriod = isAfter(request.endsAt, request.startsAt);

    if (!isValidPeriod) {
      throw new Error('Invalid period');
    }

    const movieSession = MovieSessionEntity.create({
      createdAt: new Date(),
      updatedAt: null,
      startsAt: request.startsAt,
      price: request.price,
      endsAt: request.endsAt,
      roomId: request.roomId,
      movieId: request.movieId,
    });

    await this.movieRepository.createMovieSession(movieSession);

    return {
      movieSession,
    };
  }
}
