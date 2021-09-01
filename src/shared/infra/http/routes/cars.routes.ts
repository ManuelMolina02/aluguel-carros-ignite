import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ensureAdmin } from '@shared/infra/http/middlewars/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewars/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

export { carsRoutes };
