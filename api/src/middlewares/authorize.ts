import type { RequestHandler } from 'express';

import { AppError } from '../errors/app-error';
import type { Role } from '../generated/prisma/client';

export function authorize(...allowedRoles: Role[]): RequestHandler {
  return (request, _response, next) => {
    if (!allowedRoles.includes(request.authUser.role)) {
      throw new AppError('Acesso não autorizado para este perfil.', 403);
    }

    next();
  };
}
