import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MikroOrmModuleAsyncOptions,
  MikroOrmModuleOptions,
} from '@mikro-orm/nestjs/typings';
import { BaseEntity } from '@app/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { User } from './src/users/entites/user.entity';

const logger = new Logger('MikroORM');

const config: MikroOrmModuleOptions = {
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production',
  highlighter: new SqlHighlighter(),
  logger: logger.log.bind(logger),
  allowGlobalContext: true,
  entities: [BaseEntity, User],
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const asyncConfig: MikroOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    ...config,
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    dbName: configService.get<string>('DB_NAME'),
    user: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
  }),
};

export default config;
export { asyncConfig };
