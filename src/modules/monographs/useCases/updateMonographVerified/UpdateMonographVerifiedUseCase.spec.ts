import { MonographsRepositoryInMemory } from '@modules/monographs/repositories/in-memory/MonographsRepositoryInMemory';

import { CreateMonographUseCase } from '../createMonograph/CreateMonographUseCase';
import { UpdateMonographAndVerifiedUseCase } from './UpdateMonographVerifiedUseCase';

let monographsRepositoryInMemory: MonographsRepositoryInMemory;
let createMonographUseCase: CreateMonographUseCase;
let updateMonographAndVerifiedUseCase: UpdateMonographAndVerifiedUseCase;

describe('Update Verified Monograph', () => {
  beforeEach(() => {
    monographsRepositoryInMemory = new MonographsRepositoryInMemory();
    createMonographUseCase = new CreateMonographUseCase(
      monographsRepositoryInMemory,
    );
    updateMonographAndVerifiedUseCase = new UpdateMonographAndVerifiedUseCase(
      monographsRepositoryInMemory,
    );
  });

  it('should be able to update the verified attribute on monograph', async () => {
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

    const result = await updateMonographAndVerifiedUseCase.execute(monograph);

    expect(result).toHaveProperty('id');
    expect(result.verified).toBe(true);
  });
});
