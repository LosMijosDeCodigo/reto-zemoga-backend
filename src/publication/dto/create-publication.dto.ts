import { IsDecimal, IsInt, IsPositive, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsInt()
  userId: number;

  @IsInt()
  publicationTypeId: number;

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
