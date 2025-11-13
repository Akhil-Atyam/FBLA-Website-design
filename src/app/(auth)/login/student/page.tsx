'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import LoginForm from '@/components/ui/LoginForm';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StudentLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleStudentLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError('');

    try {
      // Mock authentication - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simple mock validation
      if (data.email === 'student@mathquest.com' && data.password === 'student123') {
        // Store mock user data
        localStorage.setItem('mathquest_user', JSON.stringify({
          id: '1',
          name: 'Alex Student',
          email: data.email,
          role: 'student',
          grade: 3
        }));

        router.push('/dashboard/student');
      } else {
        setError('Invalid email or password. Try: student@mathquest.com / student123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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

          {/* Student login form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">👦</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Login</h1>
              <p className="text-gray-600">
                Access your lessons, track progress, and continue your math adventure!
              </p>
            </div>

            <LoginForm
              title="Welcome Back!"
              subtitle="Enter your credentials to access your account"
              submitText="Start Learning!"
              onSubmit={handleStudentLogin}
              loading={loading}
              error={error}
              showUsername={true}
            />

            {/* Demo account info */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 font-medium mb-1">Demo Account:</p>
              <p className="text-xs text-green-700">Email: student@mathquest.com</p>
              <p className="text-xs text-green-700">Password: student123</p>
            </div>

            {/* Forgot password link */}
            <div className="mt-6 text-center">
              <a href="#" className="text-green-600 hover:text-green-700 text-sm font-medium">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}