import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('ACCOUNT'));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
