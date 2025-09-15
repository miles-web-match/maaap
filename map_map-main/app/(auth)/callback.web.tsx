import { useEffect } from 'react';
import { router } from 'expo-router';

export default function AuthCallbackWeb() {
  useEffect(() => {
    // 本実装前は即ホームへ退避（白画面回避）
    router.replace('/');
  }, []);
  return null;
}
