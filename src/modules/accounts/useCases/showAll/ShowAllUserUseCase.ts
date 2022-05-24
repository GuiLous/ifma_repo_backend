import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class ShowAllUserUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}
  async execute(page: number): Promise<IUserResponseDTO> {
    const all = await this.usersRepository.showAll(page);

    return all;
  }
}

export { ShowAllUserUseCase };
