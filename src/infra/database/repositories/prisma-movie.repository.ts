import { MovieEntity } from 'src/app/movie/movie.entity';
import { MovieRepository } from '@app/movie/movie-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Movie as PrismaMovie,
  MovieSession as PrismaMovieSession,
} from '@prisma/client';
import { MovieSessionEntity } from '@app/movie/movie-session.entity';

@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMovieSession(data: MovieSessionEntity): Promise<void> {
    await this.prisma.movieSession.create({
      data: {
        createdAt: data.createdAt,
        price: data.price,
        endAt: data.endsAt,
        roomId: data.roomId,
        movieId: data.movieId,
        startAt: data.startsAt,
      },
    });
  }

  async findMovieSessionById(
    movieSessionId: string,
  ): Promise<MovieSessionEntity | null> {
    const results = await this.prisma.movieSession.findUnique({
      where: {
        id: movieSessionId,
      },
    });

    return results ? this.parsePrismaMovieSessionToMovieSession(results) : null;
  }

  async findById(id: string): Promise<MovieEntity | null> {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id,
      },
    });

    return movie ? this.parsePrismaMovieToMovie(movie) : null;
  }

  async create(movie: MovieEntity): Promise<void> {
    await this.prisma.movie.create({
      data: {
        title: movie.title,
        description: movie.description,
        createdAt: movie.createdAt,
      },
    });
  }

  private parsePrismaMovieToMovie(data: PrismaMovie) {
    return MovieEntity.create(
      {
        title: data.title,
        description: data.description,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    );
  }

  private parsePrismaMovieSessionToMovieSession(data: PrismaMovieSession) {
    return MovieSessionEntity.create(
      {
        roomId: data.roomId,
        createdAt: data.createdAt,
        movieId: data.movieId,
        updatedAt: data.updatedAt,
        endsAt: data.endAt,
        price: data.price,
        startsAt: data.startAt,
      },
      data.id,
    );
  }
}
