'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import LoginForm from '@/components/ui/LoginForm';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TeacherLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleTeacherLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError('');

    try {
      // Mock authentication - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simple mock validation
      if (data.email === 'teacher@mathquest.com' && data.password === 'teacher123') {
        // Store mock user data
        localStorage.setItem('mathquest_user', JSON.stringify({
          id: '2',
          name: 'Mrs. Johnson',
          email: data.email,
          role: 'teacher',
          specializations: ['Mathematics', 'Elementary Education']
        }));

        router.push('/dashboard/teacher');
      } else {
        setError('Invalid email or password. Try: teacher@mathquest.com / teacher123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/login">
              <Button variant="secondary" size="sm">
                ← Back to Login Options
              </Button>
            </Link>
          </div>

          {/* Teacher login form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">👨‍🏫</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Teacher Login</h1>
              <p className="text-gray-600">
                Manage your sessions, upload resources, and help students succeed!
              </p>
            </div>

            <LoginForm
              title="Welcome Back!"
              subtitle="Enter your credentials to access your dashboard"
              submitText="Teacher Dashboard"
              onSubmit={handleTeacherLogin}
              loading={loading}
              error={error}
              showUsername={false}
            />

            {/* Demo account info */}
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800 font-medium mb-1">Demo Account:</p>
              <p className="text-xs text-orange-700">Email: teacher@mathquest.com</p>
              <p className="text-xs text-orange-700">Password: teacher123</p>
            </div>

            {/* Forgot password link */}
            <div className="mt-6 text-center">
              <a href="#" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                Forgot your password?
              </a>
            </div>

            {/* Teacher registration info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Are you a new teacher?{' '}
                <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                  Contact us to join
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}