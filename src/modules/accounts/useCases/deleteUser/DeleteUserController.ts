import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute(email);

    return response.status(204).send();
  }
}

export { DeleteUserController };
