import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateMonographController } from '@modules/monographs/useCases/createMonograph/CreateMonographController';
import { ShowAllMonographController } from '@modules/monographs/useCases/showAll/ShowAllMonographController';
import { ShowMonographController } from '@modules/monographs/useCases/showMonograph/ShowMonographController';
import { UpdateMonographAndVerifiedController } from '@modules/monographs/useCases/updateMonographAndVerified/UpdateMonographAndVerifiedController';
import { UploadPdfController } from '@modules/monographs/useCases/uploadPdf/UploadPdfController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const monographRoutes = Router();

const uploadPdf = multer(uploadConfig);

const createMonographController = new CreateMonographController();
const uploadPdfController = new UploadPdfController();
const showMonographController = new ShowMonographController();
const showAllMonographController = new ShowAllMonographController();
const updateMonographAndVerifiedController =
  new UpdateMonographAndVerifiedController();

monographRoutes.get('/', showAllMonographController.handle);

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
export { monographRoutes };
