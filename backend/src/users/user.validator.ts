import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ username });

    return user === null || user === undefined;
  }

  defaultMessage(): string {
    return 'The username «$value» is already register.';
  }
}
