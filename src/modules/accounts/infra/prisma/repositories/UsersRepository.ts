import { IAdvisorResponseDTO } from '@modules/accounts/dtos/IAdvisorResponseDTO';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
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

  async findByConfirmedEmail(email: string): Promise<User> {
    const user = await this.repository.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
        email_confirmed: true,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.user.findFirst({
      where: {
        id,
        email_confirmed: true,
      },
    });

    return user;
  }

  async updateUser(userUpdated: User): Promise<User> {
    const user = await this.repository.user.update({
      data: userUpdated,
      where: {
        email: userUpdated.email,
      },
    });

    return user;
  }

  async showAll(page = 1): Promise<IUserResponseDTO> {
    const result = await this.repository.$transaction([
      this.repository.user.count({
        where: {
          email_confirmed: true,
        },
      }),
      this.repository.user.findMany({
        where: {
          email_confirmed: true,
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          isAdmin: true,
          isAdvisor: true,
          created_at: true,
        },
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
          fullName: 'asc',
        },
      }),
    ]);

    const [total_count, users] = result;

    return {
      total_count,
      users,
    };
  }

  async showAllAdvisors(): Promise<IAdvisorResponseDTO[]> {
    const allAdvisors = this.repository.user.findMany({
      where: {
        isAdvisor: true,
        email_confirmed: true,
      },
      select: {
        id: true,
        fullName: true,
      },
    });

    return allAdvisors;
  }

  async delete(email: string): Promise<void> {
    await this.repository.user.delete({
      where: {
        email,
      },
    });
  }

  async findWithoutConfirmEmail(id: string): Promise<User> {
    const user = await this.repository.user.findFirst({
      where: {
        id,
        email_confirmed: false,
      },
    });

    return user;
  }

  async findAllByEmail(email: string): Promise<User> {
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
}

export { UsersRepository };
