import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { NewUser } from './dto/new-user.dto';
import { User } from './user.entity';
import { PaginationParams } from 'src/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(newUser: NewUser): Promise<User> {
    return NewUser.toEntity(newUser).then((rUser) => {
      const user = this.userRepository.create(rUser);
      return this.userRepository.save(user);
    });
  }

  async listUsers(params: PaginationParams): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('w');
    queryBuilder.orderBy('w.' + params.orderBy, params.orderType);

    return paginate<User>(queryBuilder, {
      page: params.page,
      limit: params.limit,
    });
  }

  async findOne(where: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(where);

    if (!user) {
      throw new NotFoundException(
        `There isn't any user with identifier: ${where}`,
      );
    }

    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException(`Not found any user with id: ${id}`);

    return user;
  }

  /*
  async updateUser(user: User, updates: UpdateUser): Promise<User> {
    Object.assign(user, updates);

    return this.userRepository.save(user);
  }
  */

  async removeUser(user: User): Promise<User> {
    return this.userRepository.remove(user);
  }
}
