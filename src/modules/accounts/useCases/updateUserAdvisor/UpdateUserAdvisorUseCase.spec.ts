import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { UpdateUserAdvisorUseCase } from './UpdateUserAdvisorUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateUserAdvisorUseCase: UpdateUserAdvisorUseCase;

describe('Update User Advisor', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    updateUserAdvisorUseCase = new UpdateUserAdvisorUseCase(
      usersRepositoryInMemory,
    );
  });

  it('should be able to update an user isAdvisor', async () => {
    const user = await createUserUseCase.execute({
      email: 'wih@fet.va',
      fullName: 'Cora Duncan',
      password: '123',
    });

    const result = await updateUserAdvisorUseCase.execute(user.id);

    expect(result.isAdvisor).toBe(true);
    expect(result.isAdmin).toBe(true);
  });

  it('should NOT be able to update a non existent user', async () => {
    await expect(updateUserAdvisorUseCase.execute('teste id')).rejects.toEqual(
      new AppError('User does not exists!'),
    );
  });
});
