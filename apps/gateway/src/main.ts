import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerProxyGateway } from './proxy/routes.proxy';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.setGlobalPrefix('api');
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  registerProxyGateway(app);

  await app.listen(process.env.PORT || 3003);
}

bootstrap();
