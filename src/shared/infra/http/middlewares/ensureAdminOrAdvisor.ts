import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdminOrAdvisor(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (user.isAdmin || user.isAdvisor) {
    return next();
  }

  throw new AppError('User is not an Admin or an Advisor!');
}
