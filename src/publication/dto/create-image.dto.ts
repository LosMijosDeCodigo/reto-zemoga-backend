import { IsArray, IsString, IsUrl } from 'class-validator';

export class CreateImage {
  @IsString({ each: true })
  images: string[];
}
