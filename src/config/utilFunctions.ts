import { HttpException, HttpStatus } from '@nestjs/common';

export function res500(error) {
  throw new HttpException(
    {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error.name,
      message: error.message || 'Internal Server Error',
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

export function duplicateError(message: string) {
  return {
    statusCode: HttpStatus.CONFLICT,
    error: 'Duplicate Entry',
    message,
  };
}

export function successRes(data) {
  return {
    statusCode: HttpStatus.CREATED,
    data,
  };
}

export function responseHandler(data, message) {
  return data ? { data } : { message };
}
