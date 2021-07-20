import { IsArray, IsString, IsUrl } from 'class-validator';

export class ValidateUrl {
  @IsUrl({}, { each: true })
  urls: string[];
}
