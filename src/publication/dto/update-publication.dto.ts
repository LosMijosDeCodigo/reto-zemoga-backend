import { CreatePublicationDto } from './create-publication.dto';
import { IsDecimal, IsIn, IsInt, IsPositive, IsString } from 'class-validator';

export class UpdatePublicationDto {
  @IsString()
  name: string;

  @IsDecimal()
  price: number;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsString()
  contact: string;

  @IsString()
  description: string;
}
