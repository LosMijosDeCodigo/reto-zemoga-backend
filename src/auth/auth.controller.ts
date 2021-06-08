import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
  @Post('register')
  register(@Body() registerAuthDto: CreateUserDto) {
    return this.userService.create(registerAuthDto);
  }
}
