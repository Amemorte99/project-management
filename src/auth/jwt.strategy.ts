import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'superSecretJwtKey',
      ignoreExpiration: false,
    });
  }

  // Validate JWT payload and return user
  async validate(payload: any) {
    const user = await this.usersService.findByUsername(payload.username);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
