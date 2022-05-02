import { Monograph } from '@prisma/client';

interface IMonographsListResponseDTO {
  total_count: number;
  monographs: Monograph[];
}

export { IMonographsListResponseDTO };
