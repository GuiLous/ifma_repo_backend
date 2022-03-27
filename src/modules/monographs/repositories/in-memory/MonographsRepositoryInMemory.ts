import { v4 as uuidV4 } from 'uuid';

import { ICreateMonographDTO } from '@modules/monographs/dtos/ICreateMonographDTO';
import { Monograph } from '@prisma/client';

import { IMonographsRepository } from '../IMonographsRepository';

class MonographsRepositoryInMemory implements IMonographsRepository {
  monographs: Monograph[] = [];

  async create({
    title,
    authors,
    advisor,
    coAdvisors,
    published_date,
    published_local,
    resumo,
    abstract,
    keyWords,
    number_pages,
    references,
    pdf_url,
    knowledge_id,
    course_id,
    user_id,
  }: ICreateMonographDTO): Promise<Monograph> {
    const monograph: Monograph = {
      id: uuidV4(),
      title,
      authors,
      advisor,
      coAdvisors,
      published_date,
      published_local,
      resumo,
      abstract,
      keyWords,
      number_pages,
      references,
      pdf_url,
      knowledge_id,
      course_id,
      user_id,
      verified: false,
      created_at: new Date(),
    };

    this.monographs.push(monograph);

    return monograph;
  }

  async findByTitle(title: string): Promise<Monograph> {
    const monograph = this.monographs.find(
      monograph => monograph.title === title,
    );

    return monograph;
  }

  async findById(id: string): Promise<Monograph> {
    const monograph = this.monographs.find(monograph => monograph.id === id);

    return monograph;
  }

  async update(data: Monograph): Promise<Monograph> {
    const monographIndex = this.monographs.findIndex(
      monograph => monograph.id === data.id,
    );

    this.monographs[monographIndex] = data;
    const monograph = this.monographs[monographIndex];

    return monograph;
  }

  async showAllVerified(): Promise<Monograph[]> {
    const all = this.monographs.filter(
      monograph => monograph.verified === true,
    );
    return all;
  }

  async showAllNotVerified(): Promise<Monograph[]> {
    const all = this.monographs.filter(
      monograph => monograph.verified === false,
    );
    return all;
  }
}

export { MonographsRepositoryInMemory };
