import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  readonly page?: number = 1;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number = 10;
}
