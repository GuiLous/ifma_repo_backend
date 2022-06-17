import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendEmailUseCase } from './SendEmailUseCase';

class SendEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, statusMessage, titleSubmission } = request.body;

    const sendEmailUseCase = container.resolve(SendEmailUseCase);

    await sendEmailUseCase.execute(user_id, statusMessage, titleSubmission);

    return response.status(204).send();
  }
}

export { SendEmailController };
