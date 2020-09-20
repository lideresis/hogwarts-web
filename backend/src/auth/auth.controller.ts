import {
  Controller,
  Get,
  HttpCode,
  Res,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { AuthUser } from '../users/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @AuthUser() user: User,
    @Res() resp: Response,
  ): Promise<Response> {
    const token = this.authService.signToken(user);
    resp.json({
      user,
      token,
    });

    resp.setHeader('Authorization', `Bearer ${token}`);
    resp.cookie('token', token, {
      httpOnly: true,
      signed: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    return resp;
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  me(@AuthUser() user: User): User {
    return user;
  }
}
