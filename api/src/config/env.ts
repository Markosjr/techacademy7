import { config } from 'dotenv';

config({ quiet: true });

const port = Number(process.env.PORT ?? '3333');

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT deve ser um número inteiro entre 1 e 65535.');
}

export const env = { port };
