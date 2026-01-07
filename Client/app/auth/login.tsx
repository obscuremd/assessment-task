import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { requestOtp, verifyOtp } from '@/services/AuthServices';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const [open, setOpen] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Missing information', 'Please enter both email and password.');
      return;
    }

    try {
      setLoadingLogin(true);

      const res = await requestOtp(email, 'login', password);

      if (res.status === 'success') {
        Alert.alert(
          'Verification code sent',
          'A one-time verification code has been sent to your email.'
        );

        // Small delay for better UX
        setTimeout(() => {
          setOpen(true);
        }, 600);
      } else {
        Alert.alert('Login failed', res.message);
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoadingLogin(false);
    }
  }

  async function handleVerifyOtp() {
    if (!otp || otp.length < 6) {
      Alert.alert('Invalid code', 'Please enter the 6-digit verification code.');
      return;
    }

    try {
      setLoadingVerify(true);

      const res = await verifyOtp(email, Number(otp), 'login');

      if (res.status === 'success') {
        Alert.alert('Success', 'You have successfully signed in.');
        setOpen(false);
        router.push('/home');
        setOtp('');
      } else {
        Alert.alert('Verification failed', res.message);
      }
    } catch {
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    } finally {
      setLoadingVerify(false);
    }
  }

  function handleCloseDialog() {
    setOpen(false);
    setOtp('');
  }

  return (
    <>
      <View className="flex-1 gap-10">
        <View className="gap-2">
          <Text className="text-h3 font-bold text-primary">Sign in to your account</Text>
          <Text className="text-primary">
            Enter your email address and password. A one-time verification code will be sent to your
            email to complete sign-in.
          </Text>
        </View>

        <View className="gap-5">
          <View className="grid gap-3">
            <Label>Email</Label>
            <Input
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              editable={!loadingLogin}
            />
          </View>

          <View className="grid gap-3">
            <Label>Password</Label>
            <Input
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loadingLogin}
            />
          </View>
        </View>

        <View className="flex flex-row items-center gap-1">
          <Text className="text-primary">Don’t have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className="text-title2 text-blue-300">Register</Text>
          </TouchableOpacity>
        </View>

        <Button className="mt-[20%]" onPress={handleLogin} disabled={loadingLogin}>
          <Text>{loadingLogin ? 'Sending code…' : 'Continue'}</Text>
        </Button>
      </View>

      {/* OTP Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <OtpDialog
          otp={otp}
          setOtp={setOtp}
          onVerify={handleVerifyOtp}
          onCancel={handleCloseDialog}
          loading={loadingVerify}
        />
      </Dialog>
    </>
  );
}

function OtpDialog({
  otp,
  setOtp,
  onVerify,
  onCancel,
  loading,
}: {
  otp: string;
  setOtp: (v: string) => void;
  onVerify: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>OTP Verification</DialogTitle>
        <DialogDescription>
          A 6-digit verification code has been sent to your email address. Enter it below to
          continue.
        </DialogDescription>
      </DialogHeader>

      <View className="grid gap-3">
        <Label>Verification Code</Label>
        <Input
          placeholder="Enter 6-digit code"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          editable={!loading}
        />
      </View>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" onPress={onCancel} disabled={loading}>
            <Text className="text-primary">Cancel</Text>
          </Button>
        </DialogClose>

        <Button onPress={onVerify} disabled={loading}>
          <Text>{loading ? 'Verifying…' : 'Verify & Sign in'}</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
