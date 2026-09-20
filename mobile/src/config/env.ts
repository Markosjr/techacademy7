const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/$/, '');

if (!apiUrl) {
  throw new Error('EXPO_PUBLIC_API_URL não foi configurada. Consulte mobile/.env.example.');
}

export const env = { apiUrl };
