import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { getMe, login, register, type LoginInput, type RegisterInput } from '@/services/auth.service';
import { setApiToken } from '@/services/api';
import { getStoredToken, removeToken, saveToken } from '@/services/session-storage';
import type { User } from '@/types/domain';

type AuthContextValue = {
  user: User | null;
  isRestoring: boolean;
  signIn(input: LoginInput): Promise<void>;
  signUp(input: RegisterInput): Promise<void>;
  signOut(): Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    void (async () => {
      const token = await getStoredToken();
      if (!token) { setIsRestoring(false); return; }
      try {
        setApiToken(token);
        setUser(await getMe());
      } catch {
        setApiToken(null);
        await removeToken();
      } finally {
        setIsRestoring(false);
      }
    })();
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isRestoring,
    async signIn(input) {
      const result = await login(input);
      try {
        await saveToken(result.token);
        setApiToken(result.token);
        setUser(await getMe());
      } catch (error) {
        setApiToken(null);
        await removeToken();
        throw error;
      }
    },
    async signUp(input) { await register(input); },
    async signOut() {
      setApiToken(null);
      setUser(null);
      await removeToken();
    },
  }), [user, isRestoring]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return context;
}
