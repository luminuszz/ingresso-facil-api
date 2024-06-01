import { User } from 'src/app/users/user';
import { UserRepository } from '../../../app/users/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user ? this.parsePrismaUserToUser(user) : null;
  }

  private parsePrismaUserToUser(user: PrismaUser): User {
    return User.create(
      {
        email: user.email,
        password: user.passwordHash,
        name: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id,
    );
  }

  async create(user: User) {
    await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        passwordHash: user.password,
      },
    });
  }
}
