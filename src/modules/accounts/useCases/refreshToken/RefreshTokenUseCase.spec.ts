import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Refresh Token', () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to create a new token with refresh token', async () => {
    const user: ICreateUserDTO = {
      email: 'teste@token.com',
      password: '123',
      fullName: 'teste test',
    };

    await createUserUseCase.execute(user);

    const userToken = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const result = await refreshTokenUseCase.execute(userToken.refresh_token);

    expect(result).toHaveProperty('refresh_token');
  });
});
