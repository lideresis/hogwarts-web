import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';


import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { NewUser } from './dto/new-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { OrderType } from 'src/types';

@Controller('users')
//@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(
    @Body() newUser: NewUser
  ): Promise<User> {
    return this.usersService.createUser(newUser);
  }

  @Get()
  async listUsers(
    @Query('page') page = 1, 
    @Query('limit') limit = 10,
    @Query('orderBy') orderBy = "created_at",
    @Query('orderType') orderType = OrderType.DESC
  ): Promise<Pagination<User>> {
    return this.usersService.listUsers({
      page, limit, orderBy, orderType
    }
    );
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser(
    @Param('id') id: string
  ): Promise<User> {
    return await this.usersService.getUser(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(
    @Param('id') id: string,
  ): Promise<User> {
    const user = await this.usersService.getUser(id);

    return this.usersService.removeUser(user);
  }
}
