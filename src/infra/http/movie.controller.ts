import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateMovieDto,
  createMovieSchema,
  CreateMovieSessionDto,
  createMovieSessionSchema,
} from './validators/movie.schema';
import { Validate } from './validators/zod-validation.pipe';
import { CreateMovie } from '@app/movie/useCases/create-movie';
import { CreateMovieSession } from '@app/movie/useCases/create-movie-session';

@Controller('/movies')
export class MovieController {
  constructor(
    private readonly createMovie: CreateMovie,
    private readonly createMovieSession: CreateMovieSession,
  ) {}

  @Post()
  @Validate(createMovieSchema)
  async createMoviePost(@Body() createMovieDto: CreateMovieDto) {
    await this.createMovie.execute(createMovieDto);
  }

  @Post('/movie-sessions')
  @Validate(createMovieSessionSchema)
  async createMovieSessionPost(@Body() dto: CreateMovieSessionDto) {
    await this.createMovieSession.execute(dto);
  }
}
