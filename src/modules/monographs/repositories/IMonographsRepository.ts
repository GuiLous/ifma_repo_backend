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
  showAllNotVerified(page?: number): Promise<IMonographsListResponseDTO>;
  searchFiltered(
    data: IMonographSearchDTO,
    page?: number,
  ): Promise<IMonographsListResponseDTO>;
  showMonograph(id: string): Promise<Monograph>;
  showMonographNotVerified(id: string): Promise<Monograph>;
  showAllNotVerifiedByUser(
    user_id: string,
    page?: number,
  ): Promise<IMonographsListResponseDTO>;
  showAllRecusedVerification(
    user_id?: string,
    page?: number,
  ): Promise<IMonographsListResponseDTO>;
}

export { IMonographsRepository };
