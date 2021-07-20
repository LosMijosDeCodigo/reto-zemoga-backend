import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import config from '../../config/app.config';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    console.log(this.configService.apiKey);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { authorization } = request.headers;

    if (this.reflector.get(IS_PUBLIC_KEY, context.getHandler())) return true;
    if (authorization && typeof authorization === 'string') {
      if (!authorization.toLowerCase().includes('bearer')) {
        throw new UnauthorizedException('Mal header');
      }
      if (this.configService.apiKey === authorization.split(' ')[1])
        return true;
      throw new UnauthorizedException('Mal token');
    }
    return false;
  }
}
