import { Monograph } from '@prisma/client';

import { ICreateMonographDTO } from '../dtos/ICreateMonographDTO';

interface IMonographsRepository {
  create(data: ICreateMonographDTO): Promise<Monograph>;
  findByTitle(title: string): Promise<Monograph>;
  findById(id: string): Promise<Monograph>;
  update(data: Monograph): Promise<Monograph>;
  showAll(): Promise<Monograph[]>;
}

export { IMonographsRepository };
