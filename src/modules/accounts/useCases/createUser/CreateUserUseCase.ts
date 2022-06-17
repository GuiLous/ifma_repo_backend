import { hash } from 'bcrypt';
import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsers } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
// import { User } from '@prisma/client';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({
    email,
    password,
    fullName,
  }: ICreateUserDTO): Promise<IUsers> {
    const emailAlreadyExists = await this.usersRepository.findAllByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('User Already Exists!');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      password: passwordHash,
      fullName,
    });

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'confirmEmail.hbs',
    );

    const token = uuidV4();

    const expires_date = this.dateProvider.addDays(7);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.fullName,
      link: `${process.env.CONFIRM_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Confirmação de E-mail',
      variables,
      templatePath,
    );

    return UserMap.toDTO(user);
  }
}

export { CreateUserUseCase };
