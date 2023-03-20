import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsUserAlreadyExist } from './user.validator';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsersService, IsUserAlreadyExist],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
})
export class UsersModule {}
