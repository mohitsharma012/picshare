'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { setCookie, deleteCookie } from 'cookies-next';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Get the ID token
        const token = await user.getIdToken();
        // Store the token in both localStorage and cookies
        localStorage.setItem('authToken', token);
        setCookie('authToken', token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        });
        setUser(user);
      } else {
        // Remove token when user is not authenticated
        localStorage.removeItem('authToken');
        deleteCookie('authToken');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}