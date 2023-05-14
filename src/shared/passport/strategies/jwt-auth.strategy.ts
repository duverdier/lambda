import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadInterface } from '../../../interfaces/payload.interface';
import { UserService } from 'src/services/user.service';
import { environmentVariable } from '../../../config/environment-variable';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentVariable.JWT_SECRET,
    });
  }

  async validate(payload: PayloadInterface) {
    const { id } = payload;

    if (!id) {
      throw new HttpException('TOKEN_INVALID', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.findById(id);
    if (!user) {
      throw new HttpException('TOKEN_INVALID', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
