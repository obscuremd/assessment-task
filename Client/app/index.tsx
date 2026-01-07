import { getUser } from '@/services/AuthServices';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function AuthGate() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function resolveAuth() {
      const result = await getUser();
      setIsAuthenticated(result.authenticated);
    }

    resolveAuth();
  }, []);

  // ⏳ Prevent flicker while checking auth
  if (isAuthenticated === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isAuthenticated ? <Redirect href="/home" /> : <Redirect href="/auth/welcome" />;
}
