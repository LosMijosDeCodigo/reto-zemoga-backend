import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(ROLES_KEY, context.getHandler());
    console.log(roles);
    if (!roles) return true;
    const user = context.switchToHttp().getRequest().user as PayloadToken;
    if (!roles.includes(user.role)) {
      throw new UnauthorizedException(
        "Your role doesn't have access to this resource",
      );
    }
    return true;
  }
}
