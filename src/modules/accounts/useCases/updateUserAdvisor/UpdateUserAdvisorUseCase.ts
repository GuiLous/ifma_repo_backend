import { inject, injectable } from 'tsyringe';

import { IUsers } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateUserAdvisorUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute(user_id: string): Promise<IUsers> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    user.isAdvisor = !user.isAdvisor;

    const userUpdated = await this.usersRepository.updateUser(user);

    return UserMap.toDTO(userUpdated);
  }
}

export { UpdateUserAdvisorUseCase };
