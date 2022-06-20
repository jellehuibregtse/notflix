import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerProxyGateway } from './proxy/routes.proxy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.setGlobalPrefix('api');
  registerProxyGateway(app);

  await app.listen(process.env.PORT || 3003);
}

bootstrap();
