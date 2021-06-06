import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return { name: 'Andres', etc: 'ETC...' };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
