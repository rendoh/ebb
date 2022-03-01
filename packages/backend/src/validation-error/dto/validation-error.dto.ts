import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorDto {
  @ApiProperty()
  readonly statusCode: number = 400;

  @ApiProperty()
  readonly message!: string[];

  @ApiProperty()
  readonly error!: string;
}
