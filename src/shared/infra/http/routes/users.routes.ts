import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController';
import { ShowAllUserController } from '@modules/accounts/useCases/showAll/ShowAllUserController';
import { UpdateUserAdvisorController } from '@modules/accounts/useCases/updateUserAdvisor/UpdateUserAdvisorController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const showAllUserController = new ShowAllUserController();
const updateUserAdvisorController = new UpdateUserAdvisorController();

usersRoutes.get('/', ensureAuthenticated, showAllUserController.handle);
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);
usersRoutes.post('/', createUserController.handle);
usersRoutes.post(
  '/update-advisor',
  ensureAuthenticated,
  updateUserAdvisorController.handle,
);

export { usersRoutes };
