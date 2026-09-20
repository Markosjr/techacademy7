import { open, unlink } from 'node:fs/promises';
import { relative, sep } from 'node:path';

import type { Express } from 'express';

import { prisma } from '../database/prisma';
import { AppError } from '../errors/app-error';
import { RequestStatus } from '../generated/prisma/client';

async function removeFile(path: string) {
  await unlink(path).catch(() => undefined);
}

async function hasValidSignature(file: Express.Multer.File) {
  const handle = await open(file.path, 'r');
  try {
    const buffer = Buffer.alloc(12);
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    const bytes = buffer.subarray(0, bytesRead);
    if (file.mimetype === 'image/jpeg') return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if (file.mimetype === 'image/png') return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    if (file.mimetype === 'image/webp') return bytes.length >= 12 && bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP';
    return false;
  } finally {
    await handle.close();
  }
}

export async function ensureImageUploadAllowed(requestId: string, userId: string) {
  const request = await prisma.maintenanceRequest.findFirst({
    where: { id: requestId, createdById: userId },
    select: { id: true, status: true },
  });
  if (!request) throw new AppError('Solicitação não encontrada.', 404);
  if (request.status !== RequestStatus.ABERTA) throw new AppError('Imagens só podem ser enviadas enquanto a solicitação estiver ABERTA.', 409);
}

export async function saveRequestImage(requestId: string, userId: string, file: Express.Multer.File) {
  try {
    await ensureImageUploadAllowed(requestId, userId);
    if (!(await hasValidSignature(file))) {
      throw new AppError('O conteúdo do arquivo não corresponde a uma imagem válida.', 400);
    }
    const storedPath = relative(process.cwd(), file.path).split(sep).join('/');
    const image = await prisma.requestImage.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: storedPath,
        requestId,
      },
      select: { id: true, filename: true, originalName: true, mimeType: true, size: true, path: true, createdAt: true },
    });
    const { path, ...publicImage } = image;
    return { ...publicImage, url: `/${path}` };
  } catch (error) {
    await removeFile(file.path);
    throw error;
  }
}
