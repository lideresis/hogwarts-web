import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

    async findOne(where: FindOneOptions<User>): Promise<User> {
      const user = await this.userRepository.findOne(where);
  
      if (!user) {
        throw new NotFoundException(
          `There isn't any user with identifier: ${where}`,
        );
      }
  
      return user;
    }
  

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  /*
  async update(id: string, updates: UserUpdate): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }
    Object.assign(user, updates);

    return this.userRepository.save(user);
  }
  */
}