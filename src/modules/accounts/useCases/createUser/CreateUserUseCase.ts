import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
// import { User } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
    fullName,
  }: ICreateUserDTO): Promise<IUserResponseDTO> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('User Already Exists!');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      password: passwordHash,
      fullName,
    });

    return UserMap.toDTO(user);
  }
}

export { CreateUserUseCase };
