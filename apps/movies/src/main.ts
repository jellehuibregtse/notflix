import { NestFactory } from '@nestjs/core';
import { MoviesModule } from './movies.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createSwaggerDocs } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(MoviesModule);
  app.useGlobalPipes(new ValidationPipe());
  createSwaggerDocs(app, 'Movies API', 'docs/movies');
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
