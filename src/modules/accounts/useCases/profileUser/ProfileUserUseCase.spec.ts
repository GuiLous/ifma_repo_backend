import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Profile User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to show an user profile', async () => {
    const user = await createUserUseCase.execute({
      email: 'teste@gmail.com',
      password: '123',
      fullName: 'teste test',
    });

    const result = await usersRepositoryInMemory.findById(user.id);

    expect(result).toHaveProperty('id');
  });
});
