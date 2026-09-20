import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const tokenKey = 'fixflow.authToken';

export async function getStoredToken() {
  if (Platform.OS === 'web') return globalThis.localStorage?.getItem(tokenKey) ?? null;
  return SecureStore.getItemAsync(tokenKey);
}

export async function saveToken(token: string) {
  if (Platform.OS === 'web') {
    globalThis.localStorage?.setItem(tokenKey, token);
    return;
  }
  await SecureStore.setItemAsync(tokenKey, token);
}

export async function removeToken() {
  if (Platform.OS === 'web') {
    globalThis.localStorage?.removeItem(tokenKey);
    return;
  }
  await SecureStore.deleteItemAsync(tokenKey);
}
