import { Router } from 'express';

import { CreateCourseController } from '@modules/courses/useCases/createCourse/CreateCourseController';
import { ShowAllCourseController } from '@modules/courses/useCases/showAllCourse/ShowAllCourseController';

const courseRoutes = Router();

const createCourseController = new CreateCourseController();
const showAllCourseController = new ShowAllCourseController();

courseRoutes.get('/', showAllCourseController.handle);

courseRoutes.post('/', createCourseController.handle);

export { courseRoutes };
