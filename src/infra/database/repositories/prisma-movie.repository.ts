import { MovieEntity } from 'src/app/movie/movie.entity';
import { MovieRepository } from '../../../app/movie/movie-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Movie as PrismaMovie } from '@prisma/client';

@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<MovieEntity | null> {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id,
      },
    });

    return movie ? this.parsePrismaMovieToMovie(movie) : null;
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

  async create(movie: MovieEntity): Promise<void> {
    await this.prisma.movie.create({
      data: {
        title: movie.title,
        description: movie.description,
        createdAt: movie.createdAt,
      },
    });
  }
}
