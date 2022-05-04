import { Monograph } from '@prisma/client';

import { ICreateMonographDTO } from '../dtos/ICreateMonographDTO';
import { IMonographSearchDTO } from '../dtos/IMonographSearchDTO';
import { IMonographsListResponseDTO } from '../dtos/IMonographsListResponseDTO';

interface IMonographsRepository {
  create(data: ICreateMonographDTO): Promise<Monograph>;
  findByTitle(title: string): Promise<Monograph>;
  findById(id: string): Promise<Monograph>;
  update(data: Monograph): Promise<Monograph>;
  showAllVerified(page?: number): Promise<IMonographsListResponseDTO>;
  showAllNotVerified(): Promise<Monograph[]>;
  searchFiltered(data: IMonographSearchDTO): Promise<Monograph[]>;
}

export { IMonographsRepository };
