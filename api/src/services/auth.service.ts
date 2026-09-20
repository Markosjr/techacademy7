import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/app-error';
import { Prisma, Role } from '../generated/prisma/client';
import type { LoginInput, RegisterInput } from '../schemas/auth.schema';

const passwordHashRounds = 12;

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
} satisfies Prisma.UserSelect;

export type PublicUser = Prisma.UserGetPayload<{ select: typeof publicUserSelect }>;

function createToken(user: PublicUser) {
  return jwt.sign({ role: user.role }, env.jwtSecret, {
    subject: user.id,
    expiresIn: env.jwtExpiresIn,
  });
}

export async function registerUser(input: RegisterInput): Promise<PublicUser> {
  const passwordHash = await hash(input.password, passwordHashRounds);

  try {
    return await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        role: Role.USER,
      },
      select: publicUserSelect,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new AppError('Já existe uma conta com este e-mail.', 409);
    }

    throw error;
  }
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  const passwordIsValid = user ? await compare(input.password, user.passwordHash) : false;

  if (!user || !passwordIsValid) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  const publicUser: PublicUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return { token: createToken(publicUser), user: publicUser };
}

export async function findPublicUserById(id: string): Promise<PublicUser | null> {
  return prisma.user.findUnique({ where: { id }, select: publicUserSelect });
}
