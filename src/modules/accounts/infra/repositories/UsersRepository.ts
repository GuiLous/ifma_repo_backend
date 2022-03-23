import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { PrismaClient, User } from '@prisma/client';
import { prisma } from '@shared/infra/database/prismaClient';

class UsersRepository implements IUsersRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async create({ email, password, fullName }: ICreateUserDTO): Promise<User> {
    const user = await this.repository.user.create({
      data: {
        email,
        password,
        fullName,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  async updateUserPassword(userUpdated: User): Promise<User> {
    const user = await this.repository.user.update({
      data: userUpdated,
      where: {
        email: userUpdated.email,
      },
    });

    return user;
  }
}

export { UsersRepository };
