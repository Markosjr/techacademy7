import { z } from 'zod';

import { Priority, RequestStatus } from '../generated/prisma/client';

const titleSchema = z.string().trim().min(3, 'O título deve possuir pelo menos 3 caracteres.').max(120);
const descriptionSchema = z
  .string()
  .trim()
  .min(10, 'A descrição deve possuir pelo menos 10 caracteres.')
  .max(2000);
const categoryIdSchema = z.uuid('Informe uma categoria válida.');

export const requestIdParamsSchema = z.object({
  id: z.uuid('Informe um identificador de solicitação válido.'),
});

export const createMaintenanceRequestSchema = z
  .object({
    title: titleSchema,
    description: descriptionSchema,
    priority: z.enum(Priority),
    categoryId: categoryIdSchema,
  })
  .strict();

export const updateMaintenanceRequestSchema = z
  .object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    priority: z.enum(Priority).optional(),
    categoryId: categoryIdSchema.optional(),
  })
  .strict()
  .refine((input) => Object.keys(input).length > 0, 'Informe ao menos um campo para atualização.');

export const listMaintenanceRequestsQuerySchema = z.object({
  status: z.enum(RequestStatus).optional(),
  priority: z.enum(Priority).optional(),
  categoryId: categoryIdSchema.optional(),
});

export const changeRequestStatusSchema = z
  .object({
    status: z.enum(RequestStatus),
    note: z.string().trim().min(1).max(500).optional(),
  })
  .strict();

export const changeRequestPrioritySchema = z
  .object({
    priority: z.enum(Priority),
  })
  .strict();

export type CreateMaintenanceRequestInput = z.infer<typeof createMaintenanceRequestSchema>;
export type UpdateMaintenanceRequestInput = z.infer<typeof updateMaintenanceRequestSchema>;
export type ListMaintenanceRequestsQuery = z.infer<typeof listMaintenanceRequestsQuerySchema>;
export type ChangeRequestStatusInput = z.infer<typeof changeRequestStatusSchema>;
