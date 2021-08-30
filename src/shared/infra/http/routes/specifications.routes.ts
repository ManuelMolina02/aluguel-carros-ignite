import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecifications/CreateSpecificationsController';

import { ensureAuthenticated } from '../middlewars/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
