import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message || 'Internal server error';

    const code =
      typeof errorResponse === 'object' && 'statusCode' in errorResponse
        ? errorResponse['statusCode']
        : 500;

    response.status(status).json({
      timestamp: new Date().toISOString(),
      status: 'fail',
      data: errorResponse,
      code,
    });
  }
}
