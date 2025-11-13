import React, { useState } from 'react';
import Button from './Button';
import { cn } from '@/lib/utils';

interface LoginFormProps {
  title: string;
  subtitle?: string;
  submitText: string;
  onSubmit: (data: { email: string; password: string }) => void;
  loading?: boolean;
  error?: string;
  className?: string;
  showUsername?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  title,
  subtitle,
  submitText,
  onSubmit,
  loading = false,
  error,
  className,
  showUsername = false
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {subtitle && (
          <p className="text-gray-600">{subtitle}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {showUsername ? 'Username or Email' : 'Email Address'}
          </label>
          <input
            type={showUsername ? 'text' : 'email'}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={showUsername ? 'Enter username or email' : 'Enter your email'}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!formData.email || !formData.password}
          className="w-full"
        >
          {submitText}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;