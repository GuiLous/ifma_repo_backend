import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, fullName, currentPassword, newPassword } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({
      email,
      fullName,
      currentPassword,
      newPassword,
    });

    return response.status(204).send();
  }
}

export { UpdateUserController };
