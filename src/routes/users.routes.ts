import { Router } from 'express';

import { CreateUserController } from '../modules/accounts/usecases/create-user/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
