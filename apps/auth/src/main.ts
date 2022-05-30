import { NestFactory } from '@nestjs/core';
import { createSwaggerDocs, RmqService } from '@app/common';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.setGlobalPrefix('api');
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  createSwaggerDocs(app, 'Auth API', 'docs/auth');
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
