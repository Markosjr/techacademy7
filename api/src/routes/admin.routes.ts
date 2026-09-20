import { Router } from 'express';

import { Role } from '../generated/prisma/client';
import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';

export const adminRoutes = Router();

adminRoutes.get('/check', authenticate, authorize(Role.ADMIN), (_request, response) => {
  response.status(200).json({ status: 'ok', role: Role.ADMIN });
});
