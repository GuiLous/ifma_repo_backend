import { Monograph } from '@prisma/client';

import { ICreateMonographDTO } from '../dtos/ICreateMonographDTO';
import { IMonographsListResponseDTO } from '../dtos/IMonographsListResponseDTO';

interface IMonographsRepository {
  create(data: ICreateMonographDTO): Promise<Monograph>;
  findByTitle(title: string): Promise<Monograph>;
  findById(id: string): Promise<Monograph>;
  update(data: Monograph): Promise<Monograph>;
  showAllVerified(page?: number): Promise<IMonographsListResponseDTO>;
  showAllNotVerified(): Promise<Monograph[]>;
}

export { IMonographsRepository };
