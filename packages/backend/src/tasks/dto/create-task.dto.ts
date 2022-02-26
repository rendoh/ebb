import { IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(256)
  readonly title!: string;

  @IsString()
  @MaxLength(1024)
  readonly content!: string;
}
