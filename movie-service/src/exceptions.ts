import { NotFoundException } from '@nestjs/common';

export const ENTITY_NOT_FOUND = (entity: string, id: string) => {
  throw new NotFoundException(`${entity} with id ${id} not found.`);
};
