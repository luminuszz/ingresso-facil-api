import { UserEntity } from '@app/users/user.entity';
import { UseCaseImpl } from '@core/use-case-impl';
import { UserRepository } from '@app/users/user-repository';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '@core/errors';

interface FindUserByIdRequest {
  id: string;
}

type FindUserByIdResponse = { user: UserEntity };

@Injectable()
export class FindUserById
  implements UseCaseImpl<FindUserByIdRequest, FindUserByIdResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: FindUserByIdRequest): Promise<FindUserByIdResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundException('User');
    }

    return {
      user,
    };
  }
}
