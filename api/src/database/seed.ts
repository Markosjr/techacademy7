import { hash } from 'bcryptjs';
import { config } from 'dotenv';
import { z } from 'zod';

import { Role } from '../generated/prisma/client';
import { prisma } from './prisma';

config({ quiet: true });

const categories = ['Elétrica', 'Hidráulica', 'Equipamentos', 'Infraestrutura', 'Outros'];
const passwordHashRounds = 12;

const adminSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().transform((email) => email.trim().toLowerCase()),
  password: z.string().min(8).max(128),
});

async function seedCategories() {
  await Promise.all(
    categories.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: { active: true },
        create: { name },
      }),
    ),
  );
}

async function seedOptionalAdmin() {
  const values = {
    name: process.env.SEED_ADMIN_NAME,
    email: process.env.SEED_ADMIN_EMAIL,
    password: process.env.SEED_ADMIN_PASSWORD,
  };
  const providedValues = Object.values(values).filter(Boolean).length;

  if (providedValues === 0) {
    return false;
  }

  if (providedValues !== 3) {
    throw new Error('Defina todas as variáveis SEED_ADMIN_NAME, SEED_ADMIN_EMAIL e SEED_ADMIN_PASSWORD.');
  }

  const admin = adminSchema.parse(values);
  const passwordHash = await hash(admin.password, passwordHashRounds);

  await prisma.user.upsert({
    where: { email: admin.email },
    update: { name: admin.name, passwordHash, role: Role.ADMIN },
    create: {
      name: admin.name,
      email: admin.email,
      passwordHash,
      role: Role.ADMIN,
    },
  });

  return true;
}

async function main() {
  await seedCategories();
  const adminCreated = await seedOptionalAdmin();

  console.log(`Categorias iniciais disponíveis: ${categories.length}.`);
  console.log(adminCreated ? 'Administrador de desenvolvimento configurado.' : 'Administrador opcional não configurado.');
}

main()
  .catch((error: unknown) => {
    console.error('Falha ao executar o seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
