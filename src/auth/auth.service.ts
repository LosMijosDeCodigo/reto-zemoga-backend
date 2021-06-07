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
      const { password, id, phone, email, fullName, createdAt } = user;
      const token = this.jwtService.sign({ id, fullName });
      return { token, id, phone, email, fullName, createdAt };
    }
    return null;
  }
}
