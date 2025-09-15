import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';

type User = { id: string; email: string; username?: string; };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      if (!email || !password) throw new Error('メールとパスワードを入力してください');
      setUser({ id: 'demo', email });
    } catch (e: any) {
      Alert.alert('ログイン失敗', e.message ?? '不明なエラー');
      throw e;
    } finally { setLoading(false); }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      if (!email || !password || !username) throw new Error('必須項目が未入力です');
      setUser({ id: 'demo', email, username });
    } catch (e: any) {
      Alert.alert('登録失敗', e.message ?? '不明なエラー');
      throw e;
    } finally { setLoading(false); }
  };

  const signOut = async () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
