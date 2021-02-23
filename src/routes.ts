import { Router } from 'express';
import { UsersController } from './controllers/UserController';

const userController = new UsersController();

const router = Router();

router.post('/', userController.create);

export { router };

// #jornadainfinita