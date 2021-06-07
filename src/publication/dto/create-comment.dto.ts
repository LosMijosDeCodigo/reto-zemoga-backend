import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  userId: number;
  @IsString()
  comment: string;
}
