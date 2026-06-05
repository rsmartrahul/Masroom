'use client';

import { motion } from '@/components/Motion';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { AuthForm } from '@/components/AuthForm';

export default function SignupPage() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden pt-24 pb-16 flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.14),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:80px_80px] opacity-35 dark:opacity-15" />
        
        {/* Decorative Blobs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />

        <div className="section-container !py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>

              <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                Join Thousands of Happy Customers
              </h2>

              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                Get access to premium mushroom products and solar services with exclusive benefits.
              </p>

              <div className="space-y-4">
                {[
                  'Exclusive access to premium products',
                  'Special discounts for members',
                  'Priority customer support 24/7',
                  'Track your orders in real-time',
                  'Get notifications on new offerings',
                  'Manage multiple addresses',
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + idx * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-lime-500">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-emerald-500/10 dark:to-lime-500/10 border border-emerald-200/80 dark:border-emerald-500/20"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">5000+</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Happy Members</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">99.8%</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Satisfaction</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">24/7</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Support</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
                  ✨ New Member
                </span>
              </div>

              <AuthForm type="signup" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
