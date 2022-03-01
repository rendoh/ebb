import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  readonly title!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  readonly content!: string;
}
