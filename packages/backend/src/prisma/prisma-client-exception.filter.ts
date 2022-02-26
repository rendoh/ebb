import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    super.catch(this.getException(exception), host);
  }

  private getException(exception: PrismaClientKnownRequestError) {
    const { code } = exception;
    switch (code) {
      case 'P2025': {
        return new NotFoundException();
      }
      default:
        return exception;
    }
  }
}
