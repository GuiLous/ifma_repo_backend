import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateMonographController } from '@modules/monographs/useCases/createMonograph/CreateMonographController';
import { SearchFilteredMonographController } from '@modules/monographs/useCases/searchFilteredMonograph/SearchFilteredMonographController';
import { ShowAllMonographNotVerifiedController } from '@modules/monographs/useCases/showAllNotVerified/ShowAllMonographNotVerifiedController';
import { ShowAllMonographNotVerifiedByUserController } from '@modules/monographs/useCases/showAllNotVerifiedByUser /ShowAllMonographNotVerifiedByUserController';
import { ShowAllMonographVerifiedController } from '@modules/monographs/useCases/showAllVerified/ShowAllMonographVerifiedController';
import { ShowMonographController } from '@modules/monographs/useCases/showMonograph/ShowMonographController';
import { UpdateMonographController } from '@modules/monographs/useCases/updateMonograph/UpdateMonographController';
import { UpdateMonographAndVerifiedController } from '@modules/monographs/useCases/updateMonographAndVerified/UpdateMonographAndVerifiedController';
import { UploadPdfController } from '@modules/monographs/useCases/uploadPdf/UploadPdfController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const monographRoutes = Router();

const uploadPdf = multer(uploadConfig);

const createMonographController = new CreateMonographController();
const uploadPdfController = new UploadPdfController();
const showMonographController = new ShowMonographController();
const showAllMonographVerifiedController =
  new ShowAllMonographVerifiedController();
const showAllMonographNotVerifiedController =
  new ShowAllMonographNotVerifiedController();
const updateMonographAndVerifiedController =
  new UpdateMonographAndVerifiedController();
const updateMonographController = new UpdateMonographController();
const searchFilteredMonographController =
  new SearchFilteredMonographController();
const showAllMonographNotVerifiedByUserController =
  new ShowAllMonographNotVerifiedByUserController();

monographRoutes.get('/monograph', showMonographController.handle);

monographRoutes.get(
  '/not-verified',
  ensureAuthenticated,
  ensureAdmin,
  showAllMonographNotVerifiedController.handle,
);

monographRoutes.get(
  '/not-verified/user/:page',
  ensureAuthenticated,
  showAllMonographNotVerifiedByUserController.handle,
);

monographRoutes.get('/search/:page', searchFilteredMonographController.handle);

monographRoutes.get('/:page', showAllMonographVerifiedController.handle);

monographRoutes.post(
  '/',
  ensureAuthenticated,
  createMonographController.handle,
);

monographRoutes.patch(
  '/pdf-upload/:id',
  ensureAuthenticated,
  uploadPdf.single('pdf'),
  uploadPdfController.handle,
);

monographRoutes.put(
  '/update-verified',
  ensureAuthenticated,
  ensureAdmin,
  updateMonographAndVerifiedController.handle,
);

monographRoutes.put(
  '/update',
  ensureAuthenticated,
  updateMonographController.handle,
);

export { monographRoutes };
