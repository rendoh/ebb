export class ValidationErrorDto {
  readonly statusCode: number = 400;
  readonly message!: string[];
  readonly error!: string;
}
