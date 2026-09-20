import { Router } from 'express';

import { login, me, register } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/authenticate';

export const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/me', authenticate, me);
