import { Text, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { getUser, logout } from '@/services/AuthServices';
import { router } from 'expo-router';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>('user@example.com'); // dummy fallback
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getUser();

        if (res.authenticated && res.user?.email) {
          setEmail(res.user.email);
        }
      } catch {
        // fallback to dummy email
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes, Logout',
        onPress: async () => {
          setLoggingOut(true);
          try {
            await logout();
            router.replace('/auth/login'); // redirect to login
          } catch (err) {
            Alert.alert('Error', 'Failed to logout. Please try again.');
          } finally {
            setLoggingOut(false);
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-secondary">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-between bg-secondary px-6 pt-10">
      <View>
        {/* Header */}
        <View className="mb-8">
          <Text className="text-h2 font-bold text-primary">Dashboard</Text>
          <Text className="text-sm text-muted-foreground">Welcome back 👋</Text>
        </View>

        {/* User Card */}
        <View className="mb-6 rounded-2xl bg-card p-5 shadow-sm">
          <Text className="mb-1 text-sm text-muted-foreground">Signed in as</Text>
          <Text className="text-base font-semibold text-primary">{email}</Text>
        </View>

        {/* Stats (Dummy Data) */}
        <View className="mb-6 flex-row justify-between gap-4">
          <DashboardCard title="Sessions" value="12" />
          <DashboardCard title="Activities" value="5" />
        </View>

        <View className="flex-row justify-between gap-4">
          <DashboardCard title="Status" value="Active" />
          <DashboardCard title="Role" value="User" />
        </View>
      </View>

      {/* Logout Button */}
      <Button variant={'destructive'} className="mb-6" onPress={handleLogout} disabled={loggingOut}>
        <Text className="font-bold text-white">{loggingOut ? 'Logging out…' : 'Logout'}</Text>
      </Button>
    </View>
  );
}

/* ------------------ Reusable Card ------------------ */
function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <View className="flex-1 rounded-2xl bg-card p-4 shadow-sm">
      <Text className="mb-1 text-xs text-muted-foreground">{title}</Text>
      <Text className="text-lg font-bold text-primary">{value}</Text>
    </View>
  );
}
