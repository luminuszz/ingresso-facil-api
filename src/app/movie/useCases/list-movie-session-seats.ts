import { Injectable } from '@nestjs/common';
import { UseCaseImpl } from '@core/use-case-impl';
import { MovieRepository } from '@app/movie/movie-repository';

interface ListMovieSessionSeatsRequest {
  movieSessionId: string;
}

type ListMovieSessionSeatsResponse = {
  seats: {
    id: string;
    seatNumber: number;
    isOccupied: boolean;
  }[];
};

@Injectable()
export class ListMovieSessionSeats
  implements
    UseCaseImpl<ListMovieSessionSeatsRequest, ListMovieSessionSeatsResponse>
{
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({
    movieSessionId,
  }: ListMovieSessionSeatsRequest): Promise<ListMovieSessionSeatsResponse> {
    const seats =
      await this.movieRepository.listMovieSessionSeats(movieSessionId);

    return {
      seats: seats.map((seat) => ({
        id: seat.id,
        seatNumber: seat.number,
        isOccupied: seat.isOccupied,
      })),
    };
  }
}
