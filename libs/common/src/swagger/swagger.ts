import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createSwaggerDocs = (
  app: INestApplication,
  title: string,
  path: string,
): void => {
  const config = new DocumentBuilder()
    .addSecurity('bearer', { type: 'http', scheme: 'bearer' })
    .setTitle(title)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
};
