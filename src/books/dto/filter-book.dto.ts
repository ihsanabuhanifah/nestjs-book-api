import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterBookDto {
  @IsOptional()
  title: string;
  @IsOptional()
  author: string;
  @IsOptional()
  category: string;
  @IsOptional()
  min_year: number;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  max_year: number;
}
