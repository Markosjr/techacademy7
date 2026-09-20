import { api } from './api';
import type { User } from '@/types/domain';

export type LoginInput = { email: string; password: string };
export type RegisterInput = LoginInput & { name: string };

export async function login(input: LoginInput) {
  const { data } = await api.post<{ token: string; user: User }>('/auth/login', input);
  return data;
}

export async function register(input: RegisterInput) {
  const { data } = await api.post<{ user: User }>('/auth/register', input);
  return data.user;
}

export async function getMe() {
  const { data } = await api.get<{ user: User }>('/auth/me');
  return data.user;
}
