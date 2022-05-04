import { Router } from 'express';

import { CreateKnowledgeAreaController } from '@modules/knowledgeArea/useCases/createKnowledgeArea/CreateKnowledgeAreaController';
import { ShowAllKnowledgeAreaController } from '@modules/knowledgeArea/useCases/showAllKnowledgeArea/ShowAllKnowledgeAreaController';

const knowledgeAreaRoutes = Router();

const createknowledgeAreaController = new CreateKnowledgeAreaController();
const showAllknowledgeAreaController = new ShowAllKnowledgeAreaController();

knowledgeAreaRoutes.get('/', showAllknowledgeAreaController.handle);

knowledgeAreaRoutes.post('/', createknowledgeAreaController.handle);

export { knowledgeAreaRoutes };
