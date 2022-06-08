import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateUserAdvisorUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute(user_id: string): Promise<IUserResponseDTO> {
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
