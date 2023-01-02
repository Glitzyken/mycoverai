import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { AllExceptionsFilter } from './shared/filters/all-exception.filter';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.File({
          filename: `${process.cwd()}/logs/app.${process.env.NODE_ENV}.log`,
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(
              `MyCoverAI running on http://localhost:${config.get('PORT')}`,
            ),
          ),
        }),
      ],
    }),
  });
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
