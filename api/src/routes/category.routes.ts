import { Router } from 'express';

import { listCategories } from '../controllers/category.controller';
import { authenticate } from '../middlewares/authenticate';

export const categoryRoutes = Router();

categoryRoutes.get('/', authenticate, listCategories);
