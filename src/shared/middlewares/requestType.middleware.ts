import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../interface/request.interface';
import { RequestType } from '../enums/requestType.enum';

@Injectable()
export class RequestTypeMiddleware implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const requestType = req.headers['request-type'];
    if (!requestType) throw new BadRequestException('Request type is required');

    if (
      requestType !== RequestType.Test &&
      requestType !== RequestType.Production
    )
      throw new BadRequestException('Invalid request type');

    if (requestType === RequestType.Test) {
      req.isTest = true;
    } else if (requestType === RequestType.Production) {
      req.isTest = false;
    }

    next();
  }
}
