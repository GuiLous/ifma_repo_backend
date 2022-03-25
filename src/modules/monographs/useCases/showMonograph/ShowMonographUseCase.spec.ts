import { MonographsRepositoryInMemory } from '@modules/monographs/repositories/in-memory/MonographsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateMonographUseCase } from '../createMonograph/CreateMonographUseCase';
import { ShowMonographUseCase } from './ShowMonographUseCase';

let monographRepositoryInMemory: MonographsRepositoryInMemory;
let createMonographUseCase: CreateMonographUseCase;
let showMonographUseCase: ShowMonographUseCase;

describe('Show Monograph', () => {
  beforeEach(() => {
    monographRepositoryInMemory = new MonographsRepositoryInMemory();
    createMonographUseCase = new CreateMonographUseCase(
      monographRepositoryInMemory,
    );
    showMonographUseCase = new ShowMonographUseCase(
      monographRepositoryInMemory,
    );
  });

  it('should be able to show a Monograph', async () => {
    const monograph = await createMonographUseCase.execute({
      title: 'title test',
      authors: 'guilherme lourenco',
      advisor: 'bruna brandao',
      resumo: 'resumo test',
      abstract: 'abstract test',
      keyWords: 'teste01;teste02',
      number_pages: 40,
      published_date: new Date(),
      published_local: 'caxias - ma',
      references: 'references test',
      course_id: 'cfa5a816-fd65-4ac1-bb94-e36412734d0a',
      knowledge_id: 'ee1a108e-fa28-4b30-a39e-3a7e9cb48a9f',
      user_id: '7cdab18a-6659-4042-a9bd-08564d37b628',
    });

    const result = await showMonographUseCase.execute(monograph.id);

    expect(result).toHaveProperty('id');
  });

  it('should NOT be able to show monograph if does not exists', async () => {
    await expect(showMonographUseCase.execute('123teste')).rejects.toEqual(
      new AppError('Monograph does not exists!'),
    );
  });
});
