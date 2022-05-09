import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { useDatabaseTestConfig } from '../../test/helpers/database';
import { Genre } from '@app/genre/genre.entity';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

describe('GenreModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        useDatabaseTestConfig(),
        MikroOrmModule.forFeature({ entities: [Genre] }),
      ],
      controllers: [GenreController],
      providers: [GenreService],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
    expect(module.get(GenreController)).toBeInstanceOf(GenreController);
    expect(module.get(GenreService)).toBeInstanceOf(GenreService);
  });
});
