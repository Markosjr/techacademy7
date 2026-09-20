import type { RequestHandler } from 'express';

import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { findPublicUserById, loginUser, registerUser } from '../services/auth.service';
import { AppError } from '../errors/app-error';

export const register: RequestHandler = async (request, response) => {
  const input = registerSchema.parse(request.body);
  const user = await registerUser(input);

  response.status(201).json({ user });
};

export const login: RequestHandler = async (request, response) => {
  const input = loginSchema.parse(request.body);
  const result = await loginUser(input);

  response.status(200).json(result);
};

export const me: RequestHandler = async (request, response) => {
  const user = await findPublicUserById(request.authUser.id);

  if (!user) {
    throw new AppError('Usuário autenticado não encontrado.', 401);
  }

  response.status(200).json({ user });
};
