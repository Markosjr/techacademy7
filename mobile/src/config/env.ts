const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/$/, '');

if (!apiUrl) {
  throw new Error('EXPO_PUBLIC_API_URL não foi configurada. Consulte mobile/.env.example.');
}

const publicOrigin = apiUrl.replace(/\/api$/, '');
export const env = { apiUrl, publicUrl: (path: string) => `${publicOrigin}${path.startsWith('/') ? path : `/${path}`}` };
