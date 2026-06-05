'use client';

import { motion } from '@/components/Motion';
import Link from 'next/link';
import { ArrowLeft, Scale, Mail, Phone } from 'lucide-react';
import { termsAndConditions } from '@/lib/legalContent';

export default function TermsPage() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.12),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.14),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-5 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
            <Scale className="h-4 w-4" />
            Terms for web and mobile
          </div>
          <h1 className="mt-5 text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">{termsAndConditions.title}</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600 dark:text-slate-300">{termsAndConditions.intro}</p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Last updated: {termsAndConditions.updatedAt}</p>
        </motion.div>

        <div className="grid gap-6">
          {termsAndConditions.sections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass-card"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{section.title}</h2>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 glass-card"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Questions about these terms?</h2>
          <div className="space-y-3 text-slate-600 dark:text-slate-300">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${termsAndConditions.contactEmail}`} className="hover:text-slate-900 dark:hover:text-white">
                {termsAndConditions.contactEmail}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href={`tel:${termsAndConditions.contactPhone.replace(/\s+/g, '')}`} className="hover:text-slate-900 dark:hover:text-white">
                {termsAndConditions.contactPhone}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

