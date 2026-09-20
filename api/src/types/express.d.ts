import type { Role } from '../generated/prisma/client';

declare global {
  namespace Express {
    interface Request {
      authUser: {
        id: string;
        role: Role;
      };
    }
  }
}

export {};
