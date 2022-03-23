import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { PrismaClient, Users_Token } from '@prisma/client';
import { prisma } from '@shared/infra/database/prismaClient';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<Users_Token> {
    const userToken = await this.repository.users_Token.create({
      data: {
        expires_date,
        refresh_token,
        user_id,
      },
    });

    return userToken;
  }

  async findByUserAndRefreshToken(
    user_id: string,
    token: string,
  ): Promise<Users_Token> {
    const userToken = await this.repository.users_Token.findFirst({
      where: {
        user_id,
        refresh_token: token,
      },
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.users_Token.delete({
      where: {
        id,
      },
    });
  }

  async findByRefreshToken(refresh_token: string): Promise<Users_Token> {
    const userToken = await this.repository.users_Token.findFirst({
      where: {
        refresh_token,
      },
    });

    return userToken;
  }

  async findByUserId(user_id: string): Promise<Users_Token> {
    const userToken = await this.repository.users_Token.findFirst({
      where: {
        user_id,
      },
    });

    return userToken;
  }
}

export { UsersTokensRepository };
