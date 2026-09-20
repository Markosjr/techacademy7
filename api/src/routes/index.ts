import { Router } from 'express';

import { adminRoutes } from './admin.routes';
import { authRoutes } from './auth.routes';
import { categoryRoutes } from './category.routes';
import { healthRoutes } from './health.routes';
import { maintenanceRequestRoutes } from './maintenance-request.routes';

export const apiRoutes = Router();

apiRoutes.use(healthRoutes);
apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/admin', adminRoutes);
apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/requests', maintenanceRequestRoutes);
