'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithProvider, signInWithCredentials } from '@/components/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import { authenticateWithCredentials } from '@/app/actions/smart-auth';
import { cn } from '@/lib/utils';

interface SmartSignInProps {
  className?: string;
  callbackUrl?: string;
}

export function SmartSignIn({ className, callbackUrl = '/dashboard' }: SmartSignInProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handle social sign in using the client-side auth helper
   */
  const handleSocialSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      setError(null);
      // Use the proper signInWithProvider function
      signInWithProvider(provider);
    } catch (error) {
      console.error('Social sign-in error:', error);
      setError('An error occurred during social sign-in. Please try again.');
      setIsLoading(false);
    }
  };

  /**
   * Handle form submission using server action first to validate,
   * then client-side signIn to establish the session
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create FormData to use with server action
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      // Use server action for credential validation
      const validationResult = await authenticateWithCredentials(formData);

      if ('error' in validationResult) {
        setError(validationResult.error);
      } else {
        // If validation passes, use client-side signIn to create the session
        const signInResult = await signInWithCredentials(email, password);
        
        if (signInResult.success) {
          // On success, redirect and refresh
          router.push(callbackUrl);
          router.refresh();
        } else {
          setError(signInResult.error || 'Authentication failed');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('w-full max-w-md mx-auto space-y-6', className)}>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-500">Sign in to your account</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          disabled={isLoading}
          onClick={() => handleSocialSignIn('google')}
        >
          <FcGoogle className="h-5 w-5" />
          Sign in with Google
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          disabled={isLoading}
          onClick={() => handleSocialSignIn('linkedin')}
        >
          <FaLinkedin className="h-5 w-5 text-blue-700" />
          Sign in with LinkedIn
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a 
                href="/forgot-password" 
                className="text-sm font-medium text-emerald-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-emerald-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
} 