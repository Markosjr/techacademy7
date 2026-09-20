import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import multer from 'multer';

import { AppError } from '../errors/app-error';

export const requestUploadDirectory = resolve(process.cwd(), 'uploads', 'requests');
export const maxImageSize = 5 * 1024 * 1024;

mkdirSync(requestUploadDirectory, { recursive: true });

const allowedTypes: Record<string, string> = {
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

export const requestImageUpload = multer({
  storage: multer.diskStorage({
    destination: requestUploadDirectory,
    filename: (_request, file, callback) => {
      callback(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`);
    },
  }),
  limits: { fileSize: maxImageSize, files: 1 },
  fileFilter: (_request, file, callback) => {
    const extension = extname(file.originalname).toLowerCase();
    if (!allowedTypes[extension] || allowedTypes[extension] !== file.mimetype.toLowerCase()) {
      callback(new AppError('Envie uma imagem JPEG, JPG, PNG ou WEBP válida.', 400));
      return;
    }
    callback(null, true);
  },
});
