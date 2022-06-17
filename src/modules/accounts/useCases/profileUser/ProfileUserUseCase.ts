import { inject, injectable } from 'tsyringe';

import { IUsers } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUsers> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
