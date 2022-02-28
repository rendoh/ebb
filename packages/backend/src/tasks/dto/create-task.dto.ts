import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  readonly title!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(1024)
  readonly content!: string;
}
