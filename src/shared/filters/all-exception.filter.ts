import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import constants from '../constants';
import GenericHelper from '../utils/generic';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const httpAdapter = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const { method, originalUrl } = req;
    const ip = GenericHelper.getIpAddress(req);
    let httpStatus: number;
    let message = HttpStatus.INTERNAL_SERVER_ERROR as unknown as string;

    const logger = new Logger(exception.name);

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const res = exception.getResponse();
      message = res['message'];
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = constants.GENERIC_ERROR;
    }

    logger.error(
      `${exception.name} - ${httpStatus} - ${message} - ${originalUrl} - ${method} - ${ip}`,
      exception.stack,
      exception.name,
    );

    const responseBody = {
      status: constants.FAIL,
      message: message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
