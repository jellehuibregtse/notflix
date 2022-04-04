import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { useDatabaseTestConfig } from '../test/helpers/database';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [useDatabaseTestConfig(), AppModule, MovieModule, GenreModule],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
    expect(module.get(MovieModule)).toBeInstanceOf(MovieModule);
    expect(module.get(GenreModule)).toBeInstanceOf(GenreModule);
  });
});
