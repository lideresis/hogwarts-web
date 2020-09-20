import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { NewUser } from './dto/new-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('new-user')
  //@UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() newUser: NewUser): Promise<User> {
    const user = NewUser.toEntity(newUser).then(user =>
      this.usersService.create(user),
    );

    return user;
  }
}
