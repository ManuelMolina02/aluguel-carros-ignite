import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecifications/CreateSpecificationsController';
import { ensureAdmin } from '@shared/infra/http/middlewars/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewars/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

export { specificationsRoutes };
