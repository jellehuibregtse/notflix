import { Module, OnModuleInit } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Movie } from './entities/movie.entity';
import * as Joi from 'joi';
import { asyncConfig } from '../mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
      }),
      envFilePath: './apps/movies/.env',
    }),
    MikroOrmModule.forRootAsync(asyncConfig),
    MikroOrmModule.forFeature([Movie]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    await this.orm.getSchemaGenerator().updateSchema();
  }
}
