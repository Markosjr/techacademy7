export type Role = 'USER' | 'ADMIN';
export type Priority = 'BAIXA' | 'MEDIA' | 'ALTA';
export type RequestStatus = 'ABERTA' | 'EM_ANALISE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';

export type User = { id: string; name: string; email: string; role: Role };
export type Category = { id: string; name: string };

export type RequestListItem = {
  id: string;
  title: string;
  priority: Priority;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  category: Category;
  createdBy?: Pick<User, 'id' | 'name' | 'email'>;
};

export type StatusHistory = {
  id: string;
  previousStatus: RequestStatus | null;
  newStatus: RequestStatus;
  note: string | null;
  createdAt: string;
  changedBy: Pick<User, 'id' | 'name' | 'role'>;
};

export type MaintenanceRequest = RequestListItem & {
  description: string;
  canceledAt: string | null;
  completedAt: string | null;
  createdBy: Pick<User, 'id' | 'name' | 'email'>;
  images: RequestImage[];
  history: StatusHistory[];
};

export type RequestImage = { id: string; filename: string; originalName: string; mimeType: string; size: number; url: string; createdAt: string };

export type RequestPayload = {
  title: string;
  description: string;
  priority: Priority;
  categoryId: string;
};
