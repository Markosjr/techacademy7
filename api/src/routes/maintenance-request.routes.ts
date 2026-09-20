import { Router } from 'express';

import {
  cancelRequest,
  changePriority,
  changeStatus,
  createRequest,
  getRequest,
  listRequests,
  updateRequest,
} from '../controllers/maintenance-request.controller';
import { Role } from '../generated/prisma/client';
import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';

export const maintenanceRequestRoutes = Router();

maintenanceRequestRoutes.use(authenticate);
maintenanceRequestRoutes.post('/', authorize(Role.USER), createRequest);
maintenanceRequestRoutes.get('/', listRequests);
maintenanceRequestRoutes.get('/:id', getRequest);
maintenanceRequestRoutes.patch('/:id', authorize(Role.USER), updateRequest);
maintenanceRequestRoutes.patch('/:id/cancel', authorize(Role.USER), cancelRequest);
maintenanceRequestRoutes.patch('/:id/status', authorize(Role.ADMIN), changeStatus);
maintenanceRequestRoutes.patch('/:id/priority', authorize(Role.ADMIN), changePriority);
