import { MonographsRepositoryInMemory } from '@modules/monographs/repositories/in-memory/MonographsRepositoryInMemory';
import { UpdateMonographAndVerifiedUseCase } from '@modules/monographs/useCases/updateMonographAndVerified/UpdateMonographAndVerifiedUseCase';

import { CreateMonographUseCase } from '../createMonograph/CreateMonographUseCase';
import { ShowAllMonographUseCase } from './ShowAllMonographUseCase';

let monographsRepositoryInMemory: MonographsRepositoryInMemory;
let createMonographUseCase: CreateMonographUseCase;
let showAllMonographUseCase: ShowAllMonographUseCase;
let updateMonographAndVerifiedUseCase: UpdateMonographAndVerifiedUseCase;

describe('Show All Monographs', () => {
  beforeEach(() => {
    monographsRepositoryInMemory = new MonographsRepositoryInMemory();
    createMonographUseCase = new CreateMonographUseCase(
      monographsRepositoryInMemory,
    );
    updateMonographAndVerifiedUseCase = new UpdateMonographAndVerifiedUseCase(
      monographsRepositoryInMemory,
    );
    showAllMonographUseCase = new ShowAllMonographUseCase(
      monographsRepositoryInMemory,
    );
  });

  it('should be able to show all monographs verified', async () => {
    const monograph01 = await createMonographUseCase.execute({
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

    const monograph02 = await createMonographUseCase.execute({
      title: 'title test2',
      authors: 'guilherme lourenco',
      advisor: 'bruna brandao',
      resumo: 'resumo test2',
      abstract: 'abstract test2',
      keyWords: 'teste01;teste02',
      number_pages: 40,
      published_date: new Date(),
      published_local: 'caxias - ma',
      references: 'references test',
      course_id: 'cfa5a816-fd65-4ac1-bb94-e36412734d0a',
      knowledge_id: 'ee1a108e-fa28-4b30-a39e-3a7e9cb48a9f',
      user_id: '7cdab18a-6659-4042-a9bd-08564d37b628',
    });

    await updateMonographAndVerifiedUseCase.execute(monograph01);
    await updateMonographAndVerifiedUseCase.execute(monograph02);

    const result = await showAllMonographUseCase.execute();
    expect(result).toHaveLength(2);
  });
});
