'use client';

import { motion } from '@/components/Motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AuthForm } from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden pt-24 pb-16 flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.14),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:80px_80px] opacity-35 dark:opacity-15" />
        
        {/* Decorative Blobs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />

        <div className="section-container !py-0 flex flex-col items-center justify-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                🔐 Secure Access
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Sign In to Your Account
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Access your dashboard, orders, and manage your preferences
            </p>
          </motion.div>

          {/* Auth Form */}
          <AuthForm type="login" />

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl"
          >
            {[
              { icon: '🔒', title: 'Secure', description: 'Your data is encrypted and protected' },
              { icon: '⚡', title: 'Fast', description: 'Instant access to all services' },
              { icon: '📱', title: 'Seamless', description: 'Works on all devices' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="text-center p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
