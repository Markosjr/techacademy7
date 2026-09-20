import { api } from './api';
import type { Category } from '@/types/domain';

export async function listCategories() {
  const { data } = await api.get<Category[]>('/categories');
  return data;
}
