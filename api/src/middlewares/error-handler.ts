import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import multer from 'multer';

import { AppError } from '../errors/app-error';

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      message: 'Dados de entrada inválidos.',
      errors: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return;
  }

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      response.status(413).json({ message: 'A imagem deve possuir no máximo 5 MB.' });
      return;
    }
    response.status(400).json({ message: error.code === 'LIMIT_UNEXPECTED_FILE' ? 'Envie uma única imagem no campo image.' : 'Não foi possível processar a imagem.' });
    return;
  }

  console.error('Erro interno da API:', error);
  response.status(500).json({ message: 'Erro interno do servidor.' });
};
