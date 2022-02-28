import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TData> {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  data!: TData[];
}