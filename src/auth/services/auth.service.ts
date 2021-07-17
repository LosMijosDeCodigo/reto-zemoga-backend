import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
