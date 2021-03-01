import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UsersController } from './controllers/UserController';

const userController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

const router = Router();

router.post('/users', userController.create);

router.get('/surveys', surveysController.index);
router.post('/surveys', surveysController.create);

// E-mail
router.post('/sendMail', sendMailController.execute);

export { router };
