'use client';

import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Github, Chrome, AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { setCookie } from 'cookies-next';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/upload';

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      router.push(callbackUrl);
    }
  }, [router, callbackUrl]);

  const handleSignIn = async (provider: GoogleAuthProvider | GithubAuthProvider, providerName: string) => {
    try {
      setIsLoading(true);
      setError('');
      const result = await signInWithPopup(auth, provider);
      
      // Get the ID token
      const token = await result.user.getIdToken();
      
      // Store token in both localStorage and cookies
      localStorage.setItem('authToken', token);
      // setCookie('authToken', token, {
      //   maxAge: 30 * 24 * 60 * 60, // 30 days
      //   path: '/',
      // });
      
      router.push('/');
    } catch (error: any) {
      console.error('Auth error:', error);
      if (error.code === 'auth/popup-blocked') {
        setError(
          'The sign-in popup was blocked by your browser. Please allow popups for this site and try again.'
        );
      } else if (error.code === 'auth/unauthorized-domain') {
        setError(
          'This domain is not authorized for authentication. Please ensure localhost is added to the Firebase Console authorized domains.'
        );
      } else {
        setError(`Failed to sign in with ${providerName}. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => handleSignIn(new GoogleAuthProvider(), 'Google');
  // const handleGithubSignIn = () => handleSignIn(new GithubAuthProvider(), 'GitHub');

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to start uploading and managing your images
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm flex items-start gap-3" role="alert">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Authentication Error</p>
              <p>{error}</p>
              {error.includes('popup was blocked') && (
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Check your browser's popup blocker settings</li>
                  <li>Look for a popup blocked notification in your address bar</li>
                  <li>Allow popups for this site and try again</li>
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 hover:bg-blue-100 border border-gray-300 relative"
          >
            <Chrome className="h-5 w-5" />
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
            {isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
              </div>
            )}
          </Button>

          {/* <Button
            onClick={handleGithubSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white hover:bg-gray-800 relative"
          >
            <Github className="h-5 w-5" />
            {isLoading ? 'Signing in...' : 'Sign in with GitHub'}
            {isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              </div>
            )}
          </Button> */}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>By signing in, you agree to our terms of service and privacy policy.</p>
        </div>
      </div>
    </div>
  );
}