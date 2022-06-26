import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { createSwaggerDocs, RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  app.setGlobalPrefix('api');
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('ACCOUNT'));
  app.useGlobalPipes(new ValidationPipe());
  createSwaggerDocs(app, 'Account API', 'docs/account');
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
