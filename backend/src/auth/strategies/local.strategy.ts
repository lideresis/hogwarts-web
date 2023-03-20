import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      emailField: 'email',
      passReqToCallback: false,
    });
  }

  validate(email: string, password: string): Promise<User> {
    return this.authService.login(email, password);
  }
}
