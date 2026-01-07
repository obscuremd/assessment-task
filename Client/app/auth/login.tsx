import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { requestOtp, verifyOtp } from '@/services/AuthServices';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [open, setOpen] = useState(false);

  async function handleLogin() {
    const res = await requestOtp(email, 'login', password);
    if (res.status === 'success') {
      setOpen(true);
    } else {
      alert(res.message);
    }
  }

  async function handleVerifyOtp() {
    const res = await verifyOtp(email, Number(otp), 'login');
    if (res.status === 'success') {
      alert('Login successful');
      setOpen(false);
    } else {
      alert(res.message);
    }
  }

  return (
    <Dialog className="flex-1 gap-10" open={open} onOpenChange={setOpen}>
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
          />
        </View>

        <View className="grid gap-3">
          <Label>Password</Label>
          <Input
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <View className="flex flex-row items-center gap-1">
        <Text className="text-primary">Don’t have an account?</Text>
        <TouchableOpacity>
          <Text className="text-title2 text-blue-300">Register</Text>
        </TouchableOpacity>
      </View>

      <DialogTrigger asChild>
        <Button className="mt-[20%]" onPress={handleLogin}>
          <Text>Continue</Text>
        </Button>
      </DialogTrigger>

      <OtpDialog otp={otp} setOtp={setOtp} onVerify={handleVerifyOtp} />
    </Dialog>
  );
}

function OtpDialog({
  otp,
  setOtp,
  onVerify,
}: {
  otp: string;
  setOtp: (v: string) => void;
  onVerify: () => void;
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
        />
      </View>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            <Text className="text-primary">Cancel</Text>
          </Button>
        </DialogClose>

        <Button onPress={onVerify}>
          <Text>Verify & Sign in</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
