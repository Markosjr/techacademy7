import express from 'express';
import cors from 'cors';

import { env } from './config/env';
import { errorHandler } from './middlewares/error-handler';
import { notFound } from './middlewares/not-found';
import { apiRoutes } from './routes';

export const app = express();

app.use(cors({ origin: env.corsOrigins }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);
