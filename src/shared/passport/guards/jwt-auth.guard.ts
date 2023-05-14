import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      let message = 'TOKEN_INVALID';
      if (info) {
        switch (info.message) {
          case 'No auth token':
          case 'invalid signature':
          case 'jwt malformed':
          case 'invalid token':
          case 'invalid algorithm':
            message = 'TOKEN_INVALID';
            break;
          case 'jwt expired':
            message = 'TOKEN_EXPIRED';
            break;
        }
      }
      throw err || new UnauthorizedException(message);
    }
    return user;
  }
}
