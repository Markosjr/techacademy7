import type { RequestHandler } from 'express';

import { listActiveCategories } from '../services/category.service';

export const listCategories: RequestHandler = async (_request, response) => {
  const categories = await listActiveCategories();
  response.status(200).json(categories);
};
