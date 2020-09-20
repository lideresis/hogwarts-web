import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.usersService.findOne({
        where: { username: payload.sub },
      });
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with username: ${payload.sub}`,
      );
    }
    delete user.password;

    return user;
  }

  async login(username: string, password: string): Promise<User> {
    let user: User;

    try {
      user = await this.usersService.findOne({ where: { username } });
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with username: ${username}`,
      );
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with username: ${username}`,
      );
    }
    delete user.password;

    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.username,
    };

    return this.jwtService.sign(payload);
  }
}
