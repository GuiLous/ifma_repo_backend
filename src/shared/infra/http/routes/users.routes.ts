import { Router } from 'express';

import { ConfirmEmailController } from '@modules/accounts/useCases/confirmEmail/ConfirmEmailController';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController';
import { ShowAllUserController } from '@modules/accounts/useCases/showAll/ShowAllUserController';
import { ShowAllAdvisorController } from '@modules/accounts/useCases/showAllAdvisor/ShowAllAdvisorController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';
import { UpdateUserAdvisorController } from '@modules/accounts/useCases/updateUserAdvisor/UpdateUserAdvisorController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const showAllUserController = new ShowAllUserController();
const updateUserAdvisorController = new UpdateUserAdvisorController();
const showAllAdvisorController = new ShowAllAdvisorController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const confirmEmailController = new ConfirmEmailController();

usersRoutes.get(
  '/advisors',
  ensureAuthenticated,
  showAllAdvisorController.handle,
);

usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

usersRoutes.get(
  '/:page',
  ensureAuthenticated,
  ensureAdmin,
  showAllUserController.handle,
);

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch('/confirm-email', confirmEmailController.handle);

usersRoutes.put(
  '/update-advisor',
  ensureAuthenticated,
  ensureAdmin,
  updateUserAdvisorController.handle,
);

usersRoutes.put(
  '/update-user',
  ensureAuthenticated,
  updateUserController.handle,
);

usersRoutes.delete(
  '/delete-user',
  ensureAuthenticated,
  deleteUserController.handle,
);

export { usersRoutes };
