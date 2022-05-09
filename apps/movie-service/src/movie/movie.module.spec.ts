import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { useDatabaseTestConfig } from '../../test/helpers/database';
import { Movie } from '@app/movie/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('MovieModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        useDatabaseTestConfig(),
        MikroOrmModule.forFeature({ entities: [Movie] }),
      ],
      controllers: [MovieController],
      providers: [MovieService],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
    expect(module.get(MovieController)).toBeInstanceOf(MovieController);
    expect(module.get(MovieService)).toBeInstanceOf(MovieService);
  });
});
