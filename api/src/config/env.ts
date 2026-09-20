import { config } from 'dotenv';
import type { SignOptions } from 'jsonwebtoken';

config({ quiet: true });

const port = Number(process.env.PORT ?? '3333');

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT deve ser um número inteiro entre 1 e 65535.');
}

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error('JWT_SECRET deve possuir pelo menos 32 caracteres.');
}

const jwtExpiresIn = (process.env.JWT_EXPIRES_IN ?? '1h') as SignOptions['expiresIn'];
const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:8081,http://localhost:8088')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const env = { port, jwtSecret, jwtExpiresIn, corsOrigins };
