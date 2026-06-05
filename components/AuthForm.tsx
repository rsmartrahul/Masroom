'use client';

import { useState } from 'react';
import { motion } from './Motion';
import { ArrowRight, Mail, Lock, User, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: type === 'signup' ? '' : undefined,
    phone: type === 'signup' ? '' : undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (type === 'login') {
        await login(formData.email, formData.password);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => router.push('/products'), 1500);
      } else {
        await signup(
          formData.email,
          formData.password,
          formData.name || '',
          formData.phone || ''
        );
        setSuccess('Account created! Redirecting...');
        setTimeout(() => router.push('/products'), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      <div className="glass-card">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {type === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {type === 'login'
              ? 'Sign in to access your dashboard and orders'
              : 'Join us to get premium products and services'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Name Field (Signup only) */}
          {type === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Phone Field (Signup only) */}
          {type === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="+91 9999999999"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            {type === 'signup' && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Minimum 6 characters
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20"
            >
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm text-emerald-600 dark:text-emerald-400">{success}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              <>
                {type === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            {type === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <Link
              href={type === 'login' ? '/signup' : '/login'}
              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {type === 'login' ? 'Sign Up' : 'Sign In'}
            </Link>
          </p>
          <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
            By continuing, you agree to our{' '}
            <Link href="/privacy-policy" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              Terms and Conditions
            </Link>
            .
          </p>
        </div>
      </div>
    </motion.div>
  );
}
