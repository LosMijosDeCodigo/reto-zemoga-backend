import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;
  @IsString()
  @IsOptional()
  phone?: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
