import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

// Backend base URL
const BASE_URL = 'https://assessment-task-nine.vercel.app';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

interface RegisterParams {
  email: string;
  password: string;
  fullname: string;
  d_o_b: number;
  gender: string;
}

// ---------------- OTP REQUEST ----------------
export async function requestOtp(email: string, purpose: 'login' | 'register', password?: string) {
  if (!email) return { status: 'error', title: 'Missing Email', message: 'Email is required' };

  try {
    const res = await axios.post(`${BASE_URL}/user/auth`, {
      email,
      purpose,
      password,
    });

    if (res.status === 200) {
      return {
        status: 'success',
        title: 'OTP Sent',
        message: 'Check your email for the OTP',
      };
    } else {
      console.log(JSON.stringify(res, null, 2));
      return { status: 'error', title: 'Error', message: res.data.message };
    }
  } catch (err: any) {
    console.log(JSON.stringify(err, null, 2));
    return {
      status: 'error',
      title: 'Request OTP Failed',
      message: err.response?.data?.message || 'Something went wrong',
    };
  }
}

// ---------------- VERIFY OTP ----------------
export async function verifyOtp(
  email: string,
  code: number,
  purpose: 'login' | 'register',
  extraData?: Partial<RegisterParams>
) {
  if (!email || !code)
    return { status: 'error', title: 'Missing Data', message: 'Email or OTP missing' };

  try {
    const res = await axios.post(`${BASE_URL}/otp/verify-otp`, {
      email,
      code,
      purpose,
      ...extraData,
    });

    if (res.status === 200) {
      // Store JWT if returned
      if (res.data.token) {
        await SecureStore.setItemAsync('UserToken', res.data.token);
      }

      return {
        status: 'success',
        title: res.data.message || 'OTP Verified',
        message: res.data.message || 'Success',
        hasAccount: purpose === 'login' ? true : undefined,
      };
    } else {
      return { status: 'error', title: 'Error', message: res.data.message };
    }
  } catch (err: any) {
    return {
      status: 'error',
      title: 'OTP Verification Failed',
      message: err.response?.data?.message || 'Something went wrong',
    };
  }
}

// ---------------- GET CURRENT USER ----------------
export async function getUser(): Promise<{
  authenticated: boolean;
  user?: {
    id: string;
    email: string;
  };
}> {
  const token = await SecureStore.getItemAsync('UserToken');

  if (!token) {
    return { authenticated: false };
  }

  try {
    const decoded = jwtDecode<JwtPayload & { id: string; email: string }>(token);

    const now = Math.floor(Date.now() / 1000);

    // Token expired
    if (decoded.exp && decoded.exp < now) {
      await SecureStore.deleteItemAsync('UserToken');
      return { authenticated: false };
    }

    return {
      authenticated: true,
      user: {
        id: decoded.id,
        email: decoded.email,
      },
    };
  } catch (error) {
    await SecureStore.deleteItemAsync('UserToken');
    return { authenticated: false };
  }
}

// ---------------- LOGOUT ----------------
export async function logout() {
  await SecureStore.deleteItemAsync('UserToken');
  return { status: true };
}
