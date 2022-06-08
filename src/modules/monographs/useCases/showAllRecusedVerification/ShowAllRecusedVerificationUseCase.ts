import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IMonographsListResponseDTO } from '@modules/monographs/dtos/IMonographsListResponseDTO';
import { MonographsRepository } from '@modules/monographs/infra/prisma/repositories/MonographsRepository';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { User } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ShowAllRecusedVerificationUseCase {
  constructor(
    @inject(MonographsRepository)
    private monographsRepository: IMonographsRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}
  async execute(
    page: number,
    user_email?: string,
  ): Promise<IMonographsListResponseDTO> {
    let user: User;

    if (user_email !== 'undefined') {
      user = await this.usersRepository.findByEmail(user_email);

      if (!user) {
        throw new AppError('User does not exists!');
      }
    }

    const result = await this.monographsRepository.showAllRecusedVerification(
      user?.id,
      page,
    );

    return result;
  }
}

export { ShowAllRecusedVerificationUseCase };
