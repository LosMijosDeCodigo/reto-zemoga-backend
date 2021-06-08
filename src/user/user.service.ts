import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userExist)
      throw new BadRequestException('El usuario ya se encuentra registrado');
    const newuser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newuser);
    delete user.password;
    delete user.updatedAt;
    return user;
  }

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { offset, limit } = paginationQueryDto;
    return this.userRepository.find({
      select: ['id', 'fullName', 'email', 'phone', 'createdAt'],
      skip: offset,
      take: limit,
    });
  }
  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      select: ['id', 'phone', 'fullName', 'email', 'password'],
      where: { email },
    });
  }
  findOne(id: number) {
    return this.userRepository.findOne(id);
  }
}
