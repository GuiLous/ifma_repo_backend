import { MonographsRepositoryInMemory } from '@modules/monographs/repositories/in-memory/MonographsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateMonographUseCase } from './CreateMonographUseCase';

let monographsRepositoryInMemory: MonographsRepositoryInMemory;
let createMonographUseCase: CreateMonographUseCase;

describe('Create Monograph', () => {
  beforeEach(() => {
    monographsRepositoryInMemory = new MonographsRepositoryInMemory();
    createMonographUseCase = new CreateMonographUseCase(
      monographsRepositoryInMemory,
    );
  });

  it('should be able to create a monograph', async () => {
    const monograph = await createMonographUseCase.execute({
      title: 'title test',
      authors: 'guilherme lourenco',
      advisor: 'bruna brandao',
      resumo: 'resumo test',
      abstract: 'abstract test',
      palavras_chave: 'teste',
      keyWords: 'teste01;teste02',
      number_pages: 40,
      published_date: new Date(),
      published_local: 'caxias - ma',
      references: 'references test',
      course_id: 'cfa5a816-fd65-4ac1-bb94-e36412734d0a',
      knowledge_id: 'ee1a108e-fa28-4b30-a39e-3a7e9cb48a9f',
      user_id: '7cdab18a-6659-4042-a9bd-08564d37b628',
    });

    expect(monograph).toHaveProperty('id');
  });

  it('should NOT be able to create a monograph with the same title', async () => {
    await createMonographUseCase.execute({
      title: 'title test02',
      authors: 'guilherme lourenco',
      advisor: 'bruna brandao',
      resumo: 'resumo test02',
      abstract: 'abstract test02',
      palavras_chave: 'teste',
      keyWords: 'test02e01;test02e02',
      number_pages: 40,
      published_date: new Date(),
      published_local: 'caxias - ma',
      references: 'references test02',
      course_id: 'cfa5a816-fd65-4ac1-bb94-e36412734d0a',
      knowledge_id: 'ee1a108e-fa28-4b30-a39e-3a7e9cb48a9f',
      user_id: '7cdab18a-6659-4042-a9bd-08564d37b628',
    });

    await expect(
      createMonographUseCase.execute({
        title: 'title test02',
        authors: 'guilherme lourenco',
        advisor: 'bruna brandao',
        resumo: 'resumo test02',
        abstract: 'abstract test02',
        palavras_chave: 'teste',
        keyWords: 'test02e01;test02e02',
        number_pages: 40,
        published_date: new Date(),
        published_local: 'caxias - ma',
        references: 'references test02',
        course_id: 'cfa5a816-fd65-4ac1-bb94-e36412734d0a',
        knowledge_id: 'ee1a108e-fa28-4b30-a39e-3a7e9cb48a9f',
        user_id: '7cdab18a-6659-4042-a9bd-08564d37b628',
      }),
    ).rejects.toEqual(new AppError('Monograph Already Exists!'));
  });
});
