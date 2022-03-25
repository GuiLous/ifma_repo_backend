import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ShowAllUserUseCase } from './ShowAllUserUseCase';

let showAllUserUseCase: ShowAllUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Show All Users', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showAllUserUseCase = new ShowAllUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to show all users', async () => {
    await createUserUseCase.execute({
      email: 'wih@fet.va',
      fullName: 'Cora Duncan',
      password: '123',
    });

    await createUserUseCase.execute({
      email: 'su@ju.ag',
      fullName: 'Ricky Logan',
      password: '123',
    });

    const result = await showAllUserUseCase.execute();

    expect(result).toHaveLength(2);
  });
});
