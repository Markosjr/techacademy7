import type { Priority, RequestStatus, Role } from '@/types/domain';

export const statusLabels: Record<RequestStatus, string> = {
  ABERTA: 'Aberta', EM_ANALISE: 'Em análise', EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída', CANCELADA: 'Cancelada',
};

export const priorityLabels: Record<Priority, string> = { BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta' };
export const roleLabels: Record<Role, string> = { USER: 'Usuário', ADMIN: 'Administrador' };

export const priorities = Object.keys(priorityLabels) as Priority[];

export const nextAdminStatus: Partial<Record<RequestStatus, { status: RequestStatus; label: string }>> = {
  ABERTA: { status: 'EM_ANALISE', label: 'Iniciar análise' },
  EM_ANALISE: { status: 'EM_ANDAMENTO', label: 'Iniciar atendimento' },
  EM_ANDAMENTO: { status: 'CONCLUIDA', label: 'Concluir solicitação' },
};
