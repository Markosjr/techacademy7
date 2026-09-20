import { AppError } from '../errors/app-error';
import { prisma } from '../database/prisma';
import { Prisma, Priority, RequestStatus, Role } from '../generated/prisma/client';
import type {
  ChangeRequestStatusInput,
  CreateMaintenanceRequestInput,
  ListMaintenanceRequestsQuery,
  UpdateMaintenanceRequestInput,
} from '../schemas/maintenance-request.schema';

type AuthUser = { id: string; role: Role };

const publicCreatorSelect = {
  id: true,
  name: true,
  email: true,
} satisfies Prisma.UserSelect;

const requestListSelect = {
  id: true,
  title: true,
  priority: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  category: { select: { id: true, name: true } },
} satisfies Prisma.MaintenanceRequestSelect;

const requestDetailSelect = {
  id: true,
  title: true,
  description: true,
  priority: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  canceledAt: true,
  completedAt: true,
  category: { select: { id: true, name: true } },
  createdBy: { select: publicCreatorSelect },
  images: {
    orderBy: { createdAt: 'asc' as const },
    select: {
      id: true,
      filename: true,
      originalName: true,
      mimeType: true,
      size: true,
      createdAt: true,
    },
  },
  history: {
    orderBy: { createdAt: 'asc' as const },
    select: {
      id: true,
      previousStatus: true,
      newStatus: true,
      note: true,
      createdAt: true,
      changedBy: { select: { id: true, name: true, role: true } },
    },
  },
} satisfies Prisma.MaintenanceRequestSelect;

const allowedAdminTransitions: Record<RequestStatus, RequestStatus[]> = {
  ABERTA: [RequestStatus.EM_ANALISE],
  EM_ANALISE: [RequestStatus.EM_ANDAMENTO],
  EM_ANDAMENTO: [RequestStatus.CONCLUIDA],
  CONCLUIDA: [],
  CANCELADA: [],
};

async function requireActiveCategory(categoryId: string) {
  const category = await prisma.category.findFirst({
    where: { id: categoryId, active: true },
    select: { id: true },
  });

  if (!category) {
    throw new AppError('Categoria ativa não encontrada.', 404);
  }
}

async function findAccessibleRequest(id: string, authUser: AuthUser) {
  const request = await prisma.maintenanceRequest.findFirst({
    where: {
      id,
      ...(authUser.role === Role.USER ? { createdById: authUser.id } : {}),
    },
    select: requestDetailSelect,
  });

  if (!request) {
    throw new AppError('Solicitação não encontrada.', 404);
  }

  return request;
}

async function requireOwnedRequest(id: string, userId: string) {
  const request = await prisma.maintenanceRequest.findFirst({
    where: { id, createdById: userId },
    select: { id: true, status: true },
  });

  if (!request) {
    throw new AppError('Solicitação não encontrada.', 404);
  }

  return request;
}

export async function createMaintenanceRequest(input: CreateMaintenanceRequestInput, userId: string) {
  await requireActiveCategory(input.categoryId);

  return prisma.$transaction(async (transaction) => {
    const request = await transaction.maintenanceRequest.create({
      data: {
        ...input,
        status: RequestStatus.ABERTA,
        createdById: userId,
      },
      select: requestListSelect,
    });

    await transaction.statusHistory.create({
      data: {
        requestId: request.id,
        changedById: userId,
        previousStatus: null,
        newStatus: RequestStatus.ABERTA,
        note: 'Solicitação criada.',
      },
    });

    return request;
  });
}

export function listMaintenanceRequests(filters: ListMaintenanceRequestsQuery, authUser: AuthUser) {
  const where: Prisma.MaintenanceRequestWhereInput = {
    ...filters,
    ...(authUser.role === Role.USER ? { createdById: authUser.id } : {}),
  };

  if (authUser.role === Role.ADMIN) {
    return prisma.maintenanceRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: { ...requestListSelect, createdBy: { select: publicCreatorSelect } },
    });
  }

  return prisma.maintenanceRequest.findMany({ where, orderBy: { createdAt: 'desc' }, select: requestListSelect });
}

export function getMaintenanceRequest(id: string, authUser: AuthUser) {
  return findAccessibleRequest(id, authUser);
}

export async function updateOwnMaintenanceRequest(
  id: string,
  input: UpdateMaintenanceRequestInput,
  userId: string,
) {
  const request = await requireOwnedRequest(id, userId);

  if (request.status !== RequestStatus.ABERTA) {
    throw new AppError('A solicitação só pode ser editada enquanto estiver ABERTA.', 409);
  }

  if (input.categoryId) {
    await requireActiveCategory(input.categoryId);
  }

  return prisma.maintenanceRequest.update({ where: { id }, data: input, select: requestListSelect });
}

export async function cancelOwnMaintenanceRequest(id: string, userId: string) {
  const request = await requireOwnedRequest(id, userId);
  const cancelableStatuses: RequestStatus[] = [RequestStatus.ABERTA, RequestStatus.EM_ANALISE];

  if (!cancelableStatuses.includes(request.status)) {
    throw new AppError('A solicitação não pode ser cancelada no estado atual.', 409);
  }

  const canceledAt = new Date();
  await prisma.$transaction([
    prisma.maintenanceRequest.update({
      where: { id },
      data: { status: RequestStatus.CANCELADA, canceledAt },
    }),
    prisma.statusHistory.create({
      data: {
        requestId: id,
        changedById: userId,
        previousStatus: request.status,
        newStatus: RequestStatus.CANCELADA,
        note: 'Solicitação cancelada pelo solicitante.',
      },
    }),
  ]);

  return findAccessibleRequest(id, { id: userId, role: Role.USER });
}

export async function changeMaintenanceRequestStatus(
  id: string,
  input: ChangeRequestStatusInput,
  adminId: string,
) {
  const request = await prisma.maintenanceRequest.findUnique({ where: { id }, select: { id: true, status: true } });

  if (!request) {
    throw new AppError('Solicitação não encontrada.', 404);
  }

  if (!allowedAdminTransitions[request.status].includes(input.status)) {
    throw new AppError('Transição de status não permitida.', 409);
  }

  await prisma.$transaction([
    prisma.maintenanceRequest.update({
      where: { id },
      data: {
        status: input.status,
        ...(input.status === RequestStatus.CONCLUIDA ? { completedAt: new Date() } : {}),
      },
    }),
    prisma.statusHistory.create({
      data: {
        requestId: id,
        changedById: adminId,
        previousStatus: request.status,
        newStatus: input.status,
        note: input.note,
      },
    }),
  ]);

  return findAccessibleRequest(id, { id: adminId, role: Role.ADMIN });
}

export async function changeMaintenanceRequestPriority(id: string, priority: Priority, adminId: string) {
  const request = await prisma.maintenanceRequest.findUnique({ where: { id }, select: { id: true, status: true } });

  if (!request) {
    throw new AppError('Solicitação não encontrada.', 404);
  }

  if (request.status === RequestStatus.CONCLUIDA || request.status === RequestStatus.CANCELADA) {
    throw new AppError('A prioridade não pode ser alterada em uma solicitação finalizada.', 409);
  }

  await prisma.maintenanceRequest.update({ where: { id }, data: { priority } });
  return findAccessibleRequest(id, { id: adminId, role: Role.ADMIN });
}
