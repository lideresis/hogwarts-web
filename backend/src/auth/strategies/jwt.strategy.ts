import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { configService } from '../../config/config.service'
import { AuthService } from '../auth.service';
import { User } from '../../users/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.appKey,
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  validate(payload: JwtPayload): Promise<User> {
    return this.authService.verifyPayload(payload);
  }
}