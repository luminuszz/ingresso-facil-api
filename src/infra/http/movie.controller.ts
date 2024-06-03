import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateMovieDto,
  createMovieSchema,
  CreateMovieSessionDto,
  createMovieSessionSchema,
} from './validators/movie.schema';
import { Validate } from './validators/zod-validation.pipe';
import { CreateMovie } from '@app/movie/useCases/create-movie';
import { CreateMovieSession } from '@app/movie/useCases/create-movie-session';
import { ListMovieSessionSeats } from '@app/movie/useCases/list-movie-session-seats';

@Controller('/movies')
export class MovieController {
  constructor(
    private readonly createMovie: CreateMovie,
    private readonly createMovieSession: CreateMovieSession,
    private readonly listMovieSessionSeats: ListMovieSessionSeats,
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

  @Get('/movie-sessions/:id/seats')
  async listMovieSessionSeatsGet(@Param('id') id: string) {
    const response = await this.listMovieSessionSeats.execute({
      movieSessionId: id,
    });

    return response.map((seat) => ({
      id: seat.id,
      number: seat.number,
      isOccupied: !!seat.Ticket.length,
    }));
  }
}
