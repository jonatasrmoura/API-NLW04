import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UsersController } from './controllers/UserController';

const userController = new UsersController();
const surveysController = new SurveysController();

const router = Router();

router.post('/users', userController.create);

router.get('/surveys', surveysController.index);
router.post('/surveys', surveysController.create);

export { router };
