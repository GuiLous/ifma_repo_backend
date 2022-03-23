import { v4 as uuidV4 } from 'uuid';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { Users_Token } from '@prisma/client';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: Users_Token[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<Users_Token> {
    const userToken: Users_Token = {
      id: uuidV4(),
      refresh_token,
      user_id,
      expires_date,
      created_at: new Date(),
    };

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserAndRefreshToken(
    user_id: string,
    token: string,
  ): Promise<Users_Token> {
    const userToken = this.userTokens.find(
      userToken =>
        userToken.user_id === user_id && userToken.refresh_token === token,
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find(userToken => userToken.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<Users_Token> {
    const userToken = this.userTokens.find(
      userToken => userToken.refresh_token === refresh_token,
    );

    return userToken;
  }

  async findByUserId(user_id: string): Promise<Users_Token> {
    const userToken = this.userTokens.find(
      userToken => userToken.user_id === user_id,
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
