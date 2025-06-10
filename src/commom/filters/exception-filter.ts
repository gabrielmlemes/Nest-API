import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorMessage = exception.getResponse();

    console.log('passou no exception filter..............');

    response.status(status).json({
      message: errorMessage !== '' ? errorMessage : 'Internal error',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
