import { UseCaseImpl } from '../../../core/use-case-impl';
import { MovieEntity } from '../movie.entity';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../movie-repository';

interface CreateMovieRequest {
  title: string;
  description: string;
}

type CreateMovieResponse = { movie: MovieEntity };

@Injectable()
export class CreateMovie
  implements UseCaseImpl<CreateMovieRequest, CreateMovieResponse>
{
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({
    description,
    title,
  }: CreateMovieRequest): Promise<CreateMovieResponse> {
    const movie = MovieEntity.create({
      createdAt: new Date(),
      description,
      title: title,
      updatedAt: null,
    });

    await this.movieRepository.create(movie);

    return {
      movie,
    };
  }
}
