import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
// import * as cookieParser from 'cookie-parser';

const logger = new Logger('User Service');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.use(cookieParser());
  app.enableShutdownHooks();

  await app.listen(process.env.PORT || 3002).then(() => {
    logger.log('The user service is listening.');
  });
}

bootstrap();
