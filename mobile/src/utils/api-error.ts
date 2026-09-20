import { isAxiosError } from 'axios';

type ErrorResponse = { message?: string };

export function getApiErrorMessage(error: unknown, fallback = 'Não foi possível concluir a operação.') {
  if (isAxiosError<ErrorResponse>(error)) {
    if (!error.response) return 'Não foi possível conectar à API. Verifique o endereço e a rede.';
    return error.response.data?.message ?? fallback;
  }
  return fallback;
}
