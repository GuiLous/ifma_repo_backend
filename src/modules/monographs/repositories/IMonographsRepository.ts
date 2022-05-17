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
  showAllVerifiedByUser(
    user_id: string,
    page?: number,
  ): Promise<IMonographsListResponseDTO>;
  showAllNotVerified(): Promise<Monograph[]>;
  searchFiltered(
    data: IMonographSearchDTO,
    page?: number,
  ): Promise<IMonographsListResponseDTO>;
  showMonograph(id: string): Promise<Monograph>;
}

export { IMonographsRepository };
