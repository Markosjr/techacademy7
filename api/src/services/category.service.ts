import { prisma } from '../database/prisma';

export function listActiveCategories() {
  return prisma.category.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });
}
