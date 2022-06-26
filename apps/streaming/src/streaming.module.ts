import { Module } from '@nestjs/common';
import { StreamingController } from './streaming.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3003),
      }),
      envFilePath: './apps/streaming/.env',
    }),
  ],
  controllers: [StreamingController],
})
export class StreamingModule {}
