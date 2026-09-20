import type { RequestHandler } from 'express';
import { AppError } from '../errors/app-error';

import {
  changeRequestPrioritySchema,
  changeRequestStatusSchema,
  createMaintenanceRequestSchema,
  listMaintenanceRequestsQuerySchema,
  requestIdParamsSchema,
  updateMaintenanceRequestSchema,
} from '../schemas/maintenance-request.schema';
import {
  cancelOwnMaintenanceRequest,
  changeMaintenanceRequestPriority,
  changeMaintenanceRequestStatus,
  createMaintenanceRequest,
  getMaintenanceRequest,
  listMaintenanceRequests,
  updateOwnMaintenanceRequest,
} from '../services/maintenance-request.service';
import { ensureImageUploadAllowed, saveRequestImage } from '../services/request-image.service';

export const createRequest: RequestHandler = async (request, response) => {
  const input = createMaintenanceRequestSchema.parse(request.body);
  const maintenanceRequest = await createMaintenanceRequest(input, request.authUser.id);
  response.status(201).json({ request: maintenanceRequest });
};

export const listRequests: RequestHandler = async (request, response) => {
  const filters = listMaintenanceRequestsQuerySchema.parse(request.query);
  const requests = await listMaintenanceRequests(filters, request.authUser);
  response.status(200).json(requests);
};

export const getRequest: RequestHandler = async (request, response) => {
  const { id } = requestIdParamsSchema.parse(request.params);
  const maintenanceRequest = await getMaintenanceRequest(id, request.authUser);
  response.status(200).json({ request: maintenanceRequest });
};

export const updateRequest: RequestHandler = async (request, response) => {
  const { id } = requestIdParamsSchema.parse(request.params);
  const input = updateMaintenanceRequestSchema.parse(request.body);
  const maintenanceRequest = await updateOwnMaintenanceRequest(id, input, request.authUser.id);
  response.status(200).json({ request: maintenanceRequest });
};

export const cancelRequest: RequestHandler = async (request, response) => {
  const { id } = requestIdParamsSchema.parse(request.params);
  const maintenanceRequest = await cancelOwnMaintenanceRequest(id, request.authUser.id);
  response.status(200).json({ request: maintenanceRequest });
};

export const changeStatus: RequestHandler = async (request, response) => {
  const { id } = requestIdParamsSchema.parse(request.params);
  const input = changeRequestStatusSchema.parse(request.body);
  const maintenanceRequest = await changeMaintenanceRequestStatus(id, input, request.authUser.id);
  response.status(200).json({ request: maintenanceRequest });
};

export const changePriority: RequestHandler = async (request, response) => {
  const { id } = requestIdParamsSchema.parse(request.params);
  const { priority } = changeRequestPrioritySchema.parse(request.body);
  const maintenanceRequest = await changeMaintenanceRequestPriority(id, priority, request.authUser.id);
  response.status(200).json({ request: maintenanceRequest });
};

export const authorizeImageUpload: RequestHandler = async (request, _response, next) => {
  const { id } = requestIdParamsSchema.parse(request.params);
  await ensureImageUploadAllowed(id, request.authUser.id);
  next();
};

export const uploadRequestImage: RequestHandler = async (request, response) => {
  const { id } = requestIdParamsSchema.parse(request.params);
  if (!request.file) throw new AppError('Envie uma imagem no campo image.', 400);
  const image = await saveRequestImage(id, request.authUser.id, request.file);
  response.status(201).json({ image });
};
