import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IMonographSearchDTO } from '@modules/monographs/dtos/IMonographSearchDTO';
import { IMonographsListResponseDTO } from '@modules/monographs/dtos/IMonographsListResponseDTO';
import { MonographsRepository } from '@modules/monographs/infra/prisma/repositories/MonographsRepository';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { User } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SearchFilteredMonographUseCase {
  constructor(
    @inject(MonographsRepository)
    private monographsRepository: IMonographsRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}
  async execute(
    data: IMonographSearchDTO,
    page: number,
  ): Promise<IMonographsListResponseDTO> {
    let user: User;

    if (data.user_email) {
      user = await this.usersRepository.findByConfirmedEmail(data.user_email);

      if (!user) {
        throw new AppError('User does not exists!');
      }
    }

    const newData = {
      ...data,
      user_id: user?.id,
    };

    const result = await this.monographsRepository.searchFiltered(
      newData,
      page,
    );

    return result;
  }
}

export { SearchFilteredMonographUseCase };
