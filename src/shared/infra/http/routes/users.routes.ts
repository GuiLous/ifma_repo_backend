import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController';
import { ShowAllUserController } from '@modules/accounts/useCases/showAll/ShowAllUserController';
import { ShowAllAdvisorController } from '@modules/accounts/useCases/showAllAdvisor/ShowAllAdvisorController';
import { UpdateUserAdvisorController } from '@modules/accounts/useCases/updateUserAdvisor/UpdateUserAdvisorController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const showAllUserController = new ShowAllUserController();
const updateUserAdvisorController = new UpdateUserAdvisorController();
const showAllAdvisorController = new ShowAllAdvisorController();

usersRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  showAllUserController.handle,
);

usersRoutes.get(
  '/advisors',
  ensureAuthenticated,
  showAllAdvisorController.handle,
);

usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

usersRoutes.post('/', createUserController.handle);

usersRoutes.put(
  '/update-advisor',
  ensureAuthenticated,
  ensureAdmin,
  updateUserAdvisorController.handle,
);

export { usersRoutes };
