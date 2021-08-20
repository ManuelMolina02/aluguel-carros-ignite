import { Router } from 'express';

import { ensureAuthenticated } from '../middlewars/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecifications/CreateSpecificationsController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
