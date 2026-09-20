import { api } from './api';
import type { MaintenanceRequest, Priority, RequestImage, RequestListItem, RequestPayload, RequestStatus } from '@/types/domain';
import type { SelectedRequestImage } from '@/components/RequestImagePicker';

export async function listRequests(filters?: { status?: RequestStatus; priority?: Priority }) {
  const { data } = await api.get<RequestListItem[]>('/requests', { params: filters });
  return data;
}
export async function getRequest(id: string) {
  const { data } = await api.get<{ request: MaintenanceRequest }>(`/requests/${id}`);
  return data.request;
}
export async function createRequest(input: RequestPayload) {
  const { data } = await api.post<{ request: RequestListItem }>('/requests', input);
  return data.request;
}
export async function updateRequest(id: string, input: RequestPayload) {
  const { data } = await api.patch<{ request: RequestListItem }>(`/requests/${id}`, input);
  return data.request;
}
export async function cancelRequest(id: string) {
  const { data } = await api.patch<{ request: MaintenanceRequest }>(`/requests/${id}/cancel`);
  return data.request;
}
export async function changeRequestStatus(id: string, status: RequestStatus, note?: string) {
  const { data } = await api.patch<{ request: MaintenanceRequest }>(`/requests/${id}/status`, { status, ...(note ? { note } : {}) });
  return data.request;
}
export async function changeRequestPriority(id: string, priority: Priority) {
  const { data } = await api.patch<{ request: MaintenanceRequest }>(`/requests/${id}/priority`, { priority });
  return data.request;
}

export async function uploadRequestImage(id: string, selected: SelectedRequestImage) {
  const form = new FormData();
  if (typeof window !== 'undefined') {
    const blob = await fetch(selected.uri).then(response => response.blob());
    form.append('image', blob, selected.fileName);
  } else {
    form.append('image', { uri: selected.uri, name: selected.fileName, type: selected.mimeType } as unknown as Blob);
  }
  const { data } = await api.post<{ image: RequestImage }>(`/requests/${id}/images`, form);
  return data.image;
}
