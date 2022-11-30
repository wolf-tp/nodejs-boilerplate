import httpStatus from 'http-status';

type HttpStatus = keyof typeof httpStatus;

export class ApiError extends Error {
  statusCode: HttpStatus;
  isOperational: boolean;

  constructor(statusCode: HttpStatus, message: string, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
