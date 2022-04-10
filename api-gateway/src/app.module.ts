import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [ConfigModule.forRoot(), MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
