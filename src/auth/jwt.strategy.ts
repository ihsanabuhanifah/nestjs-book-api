import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //
      ignoreExpiration: true, //untuk akses token development
      secretOrKey: 'koderahasia',
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findUserbyId(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User is not found');
    }

    return user;
  }
}
