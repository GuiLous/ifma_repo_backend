import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateMonographController } from '@modules/monographs/useCases/createMonograph/CreateMonographController';
import { ShowAllMonographNotVerifiedController } from '@modules/monographs/useCases/showAllNotVerified/ShowAllMonographNotVerifiedController';
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

monographRoutes.get('/:page', showAllMonographVerifiedController.handle);
monographRoutes.get(
  '/not-verified',
  ensureAuthenticated,
  ensureAdmin,
  showAllMonographNotVerifiedController.handle,
);

monographRoutes.get('/monograph', showMonographController.handle);

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
