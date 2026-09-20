import { create } from 'axios';

import { env } from '@/config/env';

export const api = create({ baseURL: env.apiUrl, timeout: 10000 });

export function setApiToken(token: string | null) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}
