import { inject, injectable } from 'tsyringe';

import { IAdvisorResponseDTO } from '@modules/accounts/dtos/IAdvisorResponseDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class ShowAllAdvisorUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}
  async execute(): Promise<IAdvisorResponseDTO[]> {
    const all = await this.usersRepository.showAllAdvisors();

    return all;
  }
}

export { ShowAllAdvisorUseCase };
