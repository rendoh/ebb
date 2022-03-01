import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { ValidationErrorDto } from '../dto/validation-error.dto';

export const ApiValidationErrorResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      type: ValidationErrorDto,
    }),
  );
};
