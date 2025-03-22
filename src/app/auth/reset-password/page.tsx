'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';

export default function ResetPassword() {
  const { resetPassword, error: authError, loading, clearError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    token?: string;
    general?: string;
  }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if token exists on component mount
  useEffect(() => {
    if (!token) {
      setErrors({
        token: 'Invalid or missing reset token. Please request a new password reset link.',
      });
    }
  }, [token]);

  // Set local error state when auth context error changes
  useEffect(() => {
    if (authError) {
      setErrors(prev => ({ ...prev, general: authError }));
    }
  }, [authError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear auth error when user makes changes
    if (authError) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await resetPassword(token, formData.password);
      // Set success state to show success message
      setIsSuccess(true);
      
      // Redirect is handled by the AuthContext
    } catch (error) {
      // Error handling is done in the AuthContext
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <BriefcaseIcon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Set new password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {isSuccess ? (
              <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400 dark:text-green-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Password reset successful</h3>
                    <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                      <p>
                        Your password has been reset successfully. You will be redirected to the login page shortly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : errors.token ? (
              <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400 dark:text-red-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Invalid reset link</h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      <p>{errors.token}</p>
                    </div>
                    <div className="mt-4">
                      <div className="-mx-2 -my-1.5 flex">
                        <Link
                          href="/auth/forgot-password"
                          className="rounded-md bg-red-50 dark:bg-red-900/30 px-2 py-1.5 text-sm font-medium text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50 dark:focus:ring-offset-red-900/30"
                        >
                          Request new reset link
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {errors.general && (
                  <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400 dark:text-red-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{errors.general}</h3>
                      </div>
                    </div>
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent sm:text-sm ${
                        errors.password
                          ? 'border-red-300 dark:border-red-600 text-red-900 dark:text-red-300 placeholder-red-300 dark:placeholder-red-600 focus:ring-red-500 dark:focus:ring-red-600 focus:border-red-500 dark:focus:border-red-600'
                          : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                      }`}
                    />
                    {errors.password ? (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                    ) : (
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Password must be at least 8 characters
                      </p>
                    )}
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent sm:text-sm ${
                        errors.confirmPassword
                          ? 'border-red-300 dark:border-red-600 text-red-900 dark:text-red-300 placeholder-red-300 dark:placeholder-red-600 focus:ring-red-500 dark:focus:ring-red-600 focus:border-red-500 dark:focus:border-red-600'
                          : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading || !!errors.token}
                    className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Resetting password...
                      </>
                    ) : (
                      'Reset password'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 