import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthotizationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}
  use(req: any, res: any, next: () => void) {
    let token = req.headers['authorization'];
    if (!token)
      throw new ForbiddenException(
        "No existe un token de verficacion por la cabecera 'Authorization'",
      );
    try {
      token = token.split(' ')[1];
    } catch (error) {
      throw new ForbiddenException('Enviar correctamente el token con Bearer');
    }
    const timeNow = new Date().getTime();
    try {
      const { exp, id, fullName } = this.jwtService.verify(token);
      if (exp < timeNow) {
        this.logger.log('Validacion de usuario en el middleware correcta ');
        return next();
      }
    } catch (error) {
      throw new ForbiddenException('Error de acceso al servidor');
    }
    throw new ForbiddenException('Error de acceso al servidor');
  }
}
