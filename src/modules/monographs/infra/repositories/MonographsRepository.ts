import { ICreateMonographDTO } from '@modules/monographs/dtos/ICreateMonographDTO';
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

  async update(data: Monograph): Promise<void> {
    await this.repository.monograph.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async showAll(): Promise<Monograph[]> {
    const all = await this.repository.monograph.findMany();

    return all;
  }
}

export { MonographsRepository };
