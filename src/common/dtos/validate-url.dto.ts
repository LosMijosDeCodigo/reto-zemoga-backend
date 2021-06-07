import { IsString, IsUrl } from 'class-validator';

export class ValidateUrl {
  @IsString()
  @IsUrl()
  url: string;
}
