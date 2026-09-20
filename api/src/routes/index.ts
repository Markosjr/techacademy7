import { Router } from 'express';

import { adminRoutes } from './admin.routes';
import { authRoutes } from './auth.routes';
import { healthRoutes } from './health.routes';

export const apiRoutes = Router();

apiRoutes.use(healthRoutes);
apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/admin', adminRoutes);
