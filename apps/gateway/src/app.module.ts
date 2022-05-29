import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(8000),
        MOVIE_SERVICE_HOST: Joi.string().required(),
        MOVIE_SERVICE_PORT: Joi.number().required(),
        AUTH_SERVICE_HOST: Joi.string().required(),
        AUTH_SERVICE_PORT: Joi.number().required(),
        ACCOUNT_SERVICE_HOST: Joi.string().required(),
        ACCOUNT_SERVICE_PORT: Joi.number().required(),
        WEB_HOST: Joi.string().required(),
        WEB_PORT: Joi.number().required(),
      }),
    }),
  ],
})
export class AppModule {}
