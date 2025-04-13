import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SmartSignUp } from '@/components/SmartSignUp';

export const metadata: Metadata = {
  title: 'Sign Up | SmartLink',
  description: 'Create a new SmartLink account',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container flex flex-1 items-center justify-center py-12">
        <div className="w-full">
          <SmartSignUp />
        </div>
      </div>

      <div className="py-4 border-t">
        <div className="container">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
