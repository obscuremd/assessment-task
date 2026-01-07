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

export default function RegisterScreen() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [otp, setOtp] = useState('');

  const [open, setOpen] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  async function handleRegister() {
    if (!fullname || !email || !password || !dob || !gender) {
      Alert.alert('Missing information', 'Please fill in all fields.');
      return;
    }

    if (dob.length !== 4) {
      Alert.alert('Invalid date', 'Date of birth must be a year (e.g. 2003).');
      return;
    }

    try {
      setLoadingRegister(true);

      const res = await requestOtp(email, 'register');

      if (res.status === 'success') {
        Alert.alert('Verification code sent', 'Check your email for the 6-digit code.');
        setTimeout(() => setOpen(true), 500);
      } else {
        Alert.alert(res.title, res.message);
      }
    } catch {
      Alert.alert('Error', 'Unable to send OTP.');
    } finally {
      setLoadingRegister(false);
    }
  }

  async function handleVerifyOtp() {
    if (otp.length !== 6) {
      Alert.alert('Invalid code', 'OTP must be 6 digits.');
      return;
    }

    try {
      setLoadingVerify(true);

      const res = await verifyOtp(email, Number(otp), 'register', {
        password,
        fullname,
        d_o_b: Number(dob),
        gender,
      });

      if (res.status === 'success') {
        Alert.alert('Success', 'Account created successfully.');
        setOpen(false);
        router.replace('/home');
      } else {
        Alert.alert(res.title, res.message);
      }
    } catch {
      Alert.alert('Error', 'Registration failed.');
    } finally {
      setLoadingVerify(false);
    }
  }

  return (
    <>
      <View className="flex-1 gap-10">
        <View className="gap-2">
          <Text className="text-h3 font-bold text-primary">Create an account</Text>
          <Text className="text-primary">Enter your details below to register.</Text>
        </View>

        <View className="gap-3">
          <Field label="Full name">
            <Input value={fullname} onChangeText={setFullname} />
          </Field>

          <Field label="Email">
            <Input autoCapitalize="none" value={email} onChangeText={setEmail} />
          </Field>

          <Field label="Password">
            <Input secureTextEntry value={password} onChangeText={setPassword} />
          </Field>

          <Field label="Date of birth (YYYY)">
            <Input keyboardType="number-pad" value={dob} onChangeText={setDob} />
          </Field>

          <Field label="Gender">
            <Input value={gender} onChangeText={setGender} />
          </Field>
        </View>

        <View className="flex-row gap-1">
          <Text className="text-primary">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text className="text-blue-300">Sign in</Text>
          </TouchableOpacity>
        </View>

        <Button onPress={handleRegister} disabled={loadingRegister}>
          <Text>{loadingRegister ? 'Sending code…' : 'Create account'}</Text>
        </Button>
      </View>

      <Dialog open={open} onOpenChange={setOpen}>
        <OtpDialog otp={otp} setOtp={setOtp} onVerify={handleVerifyOtp} loading={loadingVerify} />
      </Dialog>
    </>
  );
}

/* ---------- Helpers ---------- */
function Field({ label, children }: any) {
  return (
    <View className="gap-1">
      <Label>{label}</Label>
      {children}
    </View>
  );
}

function OtpDialog({ otp, setOtp, onVerify, loading }: any) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Email verification</DialogTitle>
        <DialogDescription>Enter the 6-digit code sent to your email.</DialogDescription>
      </DialogHeader>

      <Input
        className="w-full"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        editable={!loading}
      />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled={loading}>
            <Text>Cancel</Text>
          </Button>
        </DialogClose>

        <Button onPress={onVerify} disabled={loading}>
          <Text>{loading ? 'Verifying…' : 'Verify & Register'}</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
