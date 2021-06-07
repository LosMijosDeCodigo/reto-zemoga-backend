import { IsDecimal, IsIn, IsInt, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsInt()
  userId: number;
  @IsInt()
  publicationTypeId: number;
  @IsString()
  name: string;
  @IsDecimal()
  price: number;
  @IsString()
  contact: string;
  @IsString()
  description: string;
}
