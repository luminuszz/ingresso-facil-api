import { Body, Controller, Post } from '@nestjs/common';
import { CreateMovieDto, createMovieSchema } from './validators/movie.schema';
import { Validate } from './validators/zod-validation.pipe';
import { CreateMovie } from '../../app/movie/useCases/create-movie';

@Controller('/movies')
export class MovieController {
  constructor(private readonly createMovie: CreateMovie) {}

  @Post()
  @Validate(createMovieSchema)
  async createMoviePost(@Body() createMovieDto: CreateMovieDto) {
    await this.createMovie.execute(createMovieDto);
  }
}
