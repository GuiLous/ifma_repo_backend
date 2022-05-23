import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateMonographController } from '@modules/monographs/useCases/createMonograph/CreateMonographController';
import { SearchFilteredMonographController } from '@modules/monographs/useCases/searchFilteredMonograph/SearchFilteredMonographController';
import { ShowAllMonographNotVerifiedController } from '@modules/monographs/useCases/showAllNotVerified/ShowAllMonographNotVerifiedController';
import { ShowAllMonographNotVerifiedByUserController } from '@modules/monographs/useCases/showAllNotVerifiedByUser /ShowAllMonographNotVerifiedByUserController';
import { ShowAllRecusedVerificationController } from '@modules/monographs/useCases/showAllRecusedVerification/ShowAllRecusedVerificationController';
import { ShowAllMonographVerifiedController } from '@modules/monographs/useCases/showAllVerified/ShowAllMonographVerifiedController';
import { ShowMonographController } from '@modules/monographs/useCases/showMonograph/ShowMonographController';
import { ShowMonographNotVerifiedController } from '@modules/monographs/useCases/showMonographNotVerified/ShowMonographNotVerifiedController';
import { UpdateMonographController } from '@modules/monographs/useCases/updateMonograph/UpdateMonographController';
import { UpdateMonographVerifiedController } from '@modules/monographs/useCases/updateMonographVerified/UpdateMonographVerifiedController';
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
const updateMonographVerifiedController =
  new UpdateMonographVerifiedController();
const updateMonographController = new UpdateMonographController();
const searchFilteredMonographController =
  new SearchFilteredMonographController();
const showAllMonographNotVerifiedByUserController =
  new ShowAllMonographNotVerifiedByUserController();
const showMonographNotVerifiedController =
  new ShowMonographNotVerifiedController();
const showAllRecusedVerificationController =
  new ShowAllRecusedVerificationController();

monographRoutes.get('/monograph/:id', showMonographController.handle);

monographRoutes.get(
  '/not-verified/:id',
  ensureAuthenticated,
  showMonographNotVerifiedController.handle,
);

monographRoutes.get(
  '/all/not-verified/:page',
  ensureAuthenticated,
  ensureAdmin,
  showAllMonographNotVerifiedController.handle,
);

monographRoutes.get(
  '/all/not-verified/user/:page',
  ensureAuthenticated,
  showAllMonographNotVerifiedByUserController.handle,
);

monographRoutes.get('/search/:page', searchFilteredMonographController.handle);

monographRoutes.get('/all/:page', showAllMonographVerifiedController.handle);

monographRoutes.get(
  '/all/recused/:page',
  ensureAuthenticated,
  showAllRecusedVerificationController.handle,
);

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
  updateMonographVerifiedController.handle,
);

monographRoutes.put(
  '/update',
  ensureAuthenticated,
  updateMonographController.handle,
);

export { monographRoutes };
