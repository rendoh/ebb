import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TData> {
  @ApiProperty()
  readonly total!: number;

  @ApiProperty()
  readonly data!: TData[];
}
