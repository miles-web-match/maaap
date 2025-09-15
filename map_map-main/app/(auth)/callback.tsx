import { useEffect } from 'react';
import { router } from 'expo-router';

export default function AuthCallback() {
  // 本実装前はホームへ退避（白画面回避）
  useEffect(() => { router.replace('/'); }, []);
  return null;
}
