'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from './button';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function AuthButton() {
  const { user, loading } = useAuth();
  const router = useRouter();


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Clear the auth token from localStorage
      localStorage.removeItem('authToken');
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <Button disabled className="opacity-50">
        Loading...
      </Button>
    );
  }

  if (!user) {
    return (
      <Link href="/auth/login">
        <Button>Sign In</Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        {user.displayName}
      </span>
      <Button onClick={handleSignOut} variant="outline">
        Sign Out
      </Button>
    </div>
  );
}