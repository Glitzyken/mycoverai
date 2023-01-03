import 'dotenv/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { RequestTypeMiddleware } from './shared/middlewares/requestType.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { CountryService } from './country/country.service';
import { CountryModule } from './country/country.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country/entities/country.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forFeature([Country]),
    DbModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService, CountryService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, RequestTypeMiddleware).forRoutes('*');
  }
}
