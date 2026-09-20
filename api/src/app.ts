import express from 'express';

import { errorHandler } from './middlewares/error-handler';
import { notFound } from './middlewares/not-found';
import { apiRoutes } from './routes';

export const app = express();

app.use(express.json());
app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);
