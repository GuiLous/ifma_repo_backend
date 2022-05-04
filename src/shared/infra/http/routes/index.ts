import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { courseRoutes } from './course.routes';
import { knowledgeAreaRoutes } from './knowledgeArea.routes';
import { monographRoutes } from './monograph.routes';
import { passwordRoutes } from './password.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use(authenticateRoutes);
router.use('/password', passwordRoutes);
router.use('/monographs', monographRoutes);
router.use('/courses', courseRoutes);
router.use('/knowledgearea', knowledgeAreaRoutes);

export { router };
