import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import GenericHelper from '../utils/generic';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    // formating the http logs to Apache format
    const { method, originalUrl } = req;
    const ip = GenericHelper.getIpAddress(req);
    const userAgent = req.headers['user-agent'] || '';
    const date = GenericHelper.clfdate(new Date());
    const httpVersion = GenericHelper.getHttpVersionToken(req);
    const referrer = GenericHelper.getReferrerToken(req);
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        `${ip} - [${date}] "${method} ${originalUrl} HTTP/${httpVersion}" ${statusCode} ${contentLength} "${referrer}" "${userAgent}"`,
      );
    });
    next();
  }
}
