import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendEmailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(
    user_id: string,
    statusMessage: string,
    titleSubmission: string,
  ): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'statusSubmission.hbs',
    );

    const variables = {
      name: user.fullName,
      statusMessage,
      titleSubmission,
    };

    await this.mailProvider.sendMail(
      user?.email,
      'Status de Submissão',
      variables,
      templatePath,
    );
  }
}
export { SendEmailUseCase };
