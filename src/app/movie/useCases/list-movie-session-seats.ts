import { Injectable } from '@nestjs/common';
import { UseCaseImpl } from '@core/use-case-impl';
import { MovieRepository } from '@app/movie/movie-repository';

interface ListMovieSessionSeatsRequest {
  movieSessionId: string;
}

@Injectable()
export class ListMovieSessionSeats
  implements UseCaseImpl<ListMovieSessionSeatsRequest, any>
{
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({
    movieSessionId,
  }: ListMovieSessionSeatsRequest): Promise<any> {
    return await this.movieRepository.listMovieSessionSeats(movieSessionId);
  }
}
