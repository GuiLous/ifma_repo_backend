import { inject, injectable } from 'tsyringe';

import { ICreateMonographDTO } from '@modules/monographs/dtos/ICreateMonographDTO';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateMonographUseCase {
  constructor(
    @inject('MonographsRepository')
    private monographsRepository: IMonographsRepository,
  ) {}

  async execute({
    title,
    authors,
    advisor,
    coAdvisors,
    resumo,
    abstract,
    palavras_chave,
    keyWords,
    number_pages,
    published_date,
    published_local,
    references,
    pdf_url,
    course_id,
    knowledge_id,
    user_id,
  }: ICreateMonographDTO): Promise<Monograph> {
    const monographAlreadyExist = await this.monographsRepository.findByTitle(
      title,
    );

    if (monographAlreadyExist) {
      throw new AppError('Monograph Already Exists!');
    }

    const monograph = await this.monographsRepository.create({
      title,
      authors,
      advisor,
      coAdvisors,
      resumo,
      abstract,
      palavras_chave,
      keyWords,
      number_pages,
      published_date,
      published_local,
      references,
      pdf_url,
      course_id,
      knowledge_id,
      user_id,
    });

    return monograph;
  }
}

export { CreateMonographUseCase };
