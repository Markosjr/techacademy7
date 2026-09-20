import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/app-error';

type TokenPayload = {
  sub?: string;
};

export const authenticate: RequestHandler = async (request, _response, next) => {
  const [scheme, token] = request.headers.authorization?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token) {
    throw new AppError('Autenticação necessária.', 401);
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as TokenPayload;

    if (!payload.sub) {
      throw new AppError('Token inválido ou expirado.', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true },
    });

    if (!user) {
      throw new AppError('Token inválido ou expirado.', 401);
    }

    request.authUser = user;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Token inválido ou expirado.', 401);
  }
};
