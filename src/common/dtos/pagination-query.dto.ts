import { IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Max(1000)
  limit: number = 50;

  @IsOptional()
  @Min(0)
  offset: number = 0;

  @IsOptional()
  @IsString()
  search: string;
}
