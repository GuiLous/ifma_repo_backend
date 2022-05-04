/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { ICreateMonographDTO } from '@modules/monographs/dtos/ICreateMonographDTO';
import { IMonographSearchDTO } from '@modules/monographs/dtos/IMonographSearchDTO';
import { IMonographsListResponseDTO } from '@modules/monographs/dtos/IMonographsListResponseDTO';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph, PrismaClient } from '@prisma/client';
import { prisma } from '@shared/infra/database/prismaClient';

function updatePdfUrl(pdf_url: string): string {
  switch (process.env.disk) {
    case 'local':
      return `${process.env.APP_API_URL}/pdf/${pdf_url}`;
    case 's3':
      return `${process.env.AWS_BUCKET_URL}/pdf/${pdf_url}`;
    default:
      break;
  }

  return pdf_url;
}

class MonographsRepository implements IMonographsRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async create(data: ICreateMonographDTO): Promise<Monograph> {
    const monograph = await this.repository.monograph.create({
      data,
    });

    return monograph;
  }

  async findByTitle(title: string): Promise<Monograph> {
    const monograph = await this.repository.monograph.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive',
        },
      },
    });

    if (monograph) monograph.pdf_url = updatePdfUrl(monograph.pdf_url);

    return monograph;
  }

  async findById(id: string): Promise<Monograph> {
    const monograph = await this.repository.monograph.findFirst({
      where: {
        id,
      },
    });

    if (monograph) monograph.pdf_url = updatePdfUrl(monograph.pdf_url);

    return monograph;
  }

  async update(data: Monograph): Promise<Monograph> {
    const monograph = await this.repository.monograph.update({
      data,
      where: {
        id: data.id,
      },
    });

    return monograph;
  }

  async showAllVerified(page = 1): Promise<IMonographsListResponseDTO> {
    const result = await this.repository.$transaction([
      this.repository.monograph.count({
        where: {
          verified: true,
        },
      }),
      this.repository.monograph.findMany({
        where: {
          verified: true,
        },
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
          published_date: 'desc',
        },
      }),
    ]);

    const [total_count, monographs] = result;

    if (monographs.length > 0) {
      monographs.map(
        monograph => (monograph.pdf_url = updatePdfUrl(monograph.pdf_url)),
      );
    }
    return {
      total_count,
      monographs,
    };
  }

  async showAllNotVerified(): Promise<Monograph[]> {
    const all = await this.repository.monograph.findMany({
      where: {
        verified: false,
      },
    });

    if (all.length > 0) {
      all.map(
        monograph => (monograph.pdf_url = updatePdfUrl(monograph.pdf_url)),
      );
    }
    return all;
  }

  async searchFiltered(
    data: IMonographSearchDTO,
    page = 1,
  ): Promise<IMonographsListResponseDTO> {
    const result = await this.repository.$transaction([
      this.repository.monograph.count({
        where: {
          AND: [
            {
              verified: true,
            },
            {
              title: {
                contains: data.title,
                mode: 'insensitive',
              },
            },
            {
              authors: {
                contains: data.author,
                mode: 'insensitive',
              },
            },
            {
              advisor: {
                contains: data.advisor,
                mode: 'insensitive',
              },
            },
            {
              keyWords: {
                contains: data.keywords,
                mode: 'insensitive',
              },
            },
            {
              course_id: {
                contains: data.course_id,
                mode: 'insensitive',
              },
            },
            {
              knowledge_id: {
                contains: data.knowledge_id,
                mode: 'insensitive',
              },
            },
          ],
        },
      }),

      this.repository.monograph.findMany({
        where: {
          AND: [
            {
              verified: true,
            },
            {
              title: {
                contains: data.title,
                mode: 'insensitive',
              },
            },
            {
              authors: {
                contains: data.author,
                mode: 'insensitive',
              },
            },
            {
              advisor: {
                contains: data.advisor,
                mode: 'insensitive',
              },
            },
            {
              keyWords: {
                contains: data.keywords,
                mode: 'insensitive',
              },
            },
            {
              course_id: {
                contains: data.course_id,
                mode: 'insensitive',
              },
            },
            {
              knowledge_id: {
                contains: data.knowledge_id,
                mode: 'insensitive',
              },
            },
          ],
        },
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
          published_date: 'desc',
        },
      }),
    ]);

    const [total_count, monographs] = result;

    if (monographs.length > 0) {
      monographs.map(
        monograph => (monograph.pdf_url = updatePdfUrl(monograph.pdf_url)),
      );
    }
    return {
      total_count,
      monographs,
    };
  }
}

export { MonographsRepository };
