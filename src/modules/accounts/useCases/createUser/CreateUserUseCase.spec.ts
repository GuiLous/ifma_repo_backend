import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      email: 'testeCreate@gmail.com',
      password: '123',
      fullName: 'teste test',
    });

    expect(user).toHaveProperty('id');
  });

  it('should NOT be able to create an user with the same email', async () => {
    await createUserUseCase.execute({
      email: 'testeEmail@gmail.com',
      password: '123',
      fullName: 'teste test',
    });

    await expect(
      createUserUseCase.execute({
        email: 'testeEmail@gmail.com',
        password: '123',
        fullName: 'teste test',
      }),
    ).rejects.toEqual(new AppError('User Already Exists!'));
  });
});
