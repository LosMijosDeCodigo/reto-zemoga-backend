import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await compare(password, user.password))) {
      const token = this.jwtService.sign({
        id: user.id,
        fullName: user.fullName,
      });
      delete user.password;
      return { token, data: user };
    }
    return null;
  }
}
