import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { UpdateUserAdvisorUseCase } from '../updateUserAdvisor/UpdateUserAdvisorUseCase';
import { ShowAllAdvisorUseCase } from './ShowAllAdvisorUseCase';

let showAllAdvisorUseCase: ShowAllAdvisorUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateUserAdvisor: UpdateUserAdvisorUseCase;

describe('Show All Advisors', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showAllAdvisorUseCase = new ShowAllAdvisorUseCase(usersRepositoryInMemory);
    updateUserAdvisor = new UpdateUserAdvisorUseCase(usersRepositoryInMemory);
  });

  it('should be able to show all advisors', async () => {
    const user01 = await createUserUseCase.execute({
      email: 'wih@fet.va',
      fullName: 'Cora Duncan',
      password: '123',
    });

    const user02 = await createUserUseCase.execute({
      email: 'su@ju.ag',
      fullName: 'Ricky Logan',
      password: '123',
    });

    await createUserUseCase.execute({
      email: 'dasda@ju.ag',
      fullName: 'Bruce Knight',
      password: '123',
    });

    await updateUserAdvisor.execute(user01.id);
    await updateUserAdvisor.execute(user02.id);

    const result = await showAllAdvisorUseCase.execute();

    expect(result).toHaveLength(2);
  });
});
