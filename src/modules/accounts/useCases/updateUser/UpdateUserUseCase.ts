import { compare, hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsers } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IUpdateUserDatas {
  email: string;
  fullName: string;
  currentPassword: string;
  newPassword: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute(data: IUpdateUserDatas): Promise<IUsers> {
    const user = await this.usersRepository.findByConfirmedEmail(data.email);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const passwordMatch = await compare(data.currentPassword, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    const passwordHash = await hash(data.newPassword, 8);

    user.email = data.email;
    user.fullName = data.fullName;
    user.password = passwordHash;

    const userUpdated = await this.usersRepository.updateUser(user);

    return UserMap.toDTO(userUpdated);
  }
}

export { UpdateUserUseCase };
