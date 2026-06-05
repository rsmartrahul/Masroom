'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { validateEmail, validatePhoneNumber } from '@/lib/utils';
import { motion } from '@/components/Motion';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  name: string;
  mobile: string;
  email: string;
  type: 'product' | 'service' | 'general';
  product: string;
  quantity: string;
  message: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
  product?: string;
  quantity?: string;
  message?: string;
}

type EnquiryFormProps = {
  initialProduct?: string | null;
  initialService?: string | null;
  initialPlan?: string | null;
};

export default function EnquiryForm({
  initialProduct,
  initialService,
  initialPlan,
}: EnquiryFormProps) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    mobile: user?.phone || '',
    email: user?.email || '',
    type: initialService ? 'service' : 'product',
    product: initialProduct || initialPlan || '',
    quantity: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Show login prompt if not authenticated
  if (!isLoading && !isAuthenticated) {
    return (
      <section className="relative min-h-screen overflow-hidden pt-24 pb-16 flex items-center justify-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.14),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-container !py-0 text-center"
        >
          <AlertCircle className="h-16 w-16 mx-auto mb-6 text-sky-600 dark:text-sky-400" />
          <h2 className="text-4xl font-bold mb-4">Sign In Required</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto">
            Please sign in to your account to submit an enquiry. This helps us provide you with personalized support and track your requests.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/login?redirect=/enquiry${initialProduct ? `?product=${initialProduct}` : ''}`}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-bold shadow-lg shadow-emerald-500/30 hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2"
            >
              Sign In
            </Link>
            <Link
              href={`/signup?redirect=/enquiry${initialProduct ? `?product=${initialProduct}` : ''}`}
              className="px-8 py-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors inline-flex items-center justify-center gap-2"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full" />
        </div>
      </section>
    );
  }

  const productOptions = [
    { id: 'fresh-1', label: 'Fresh Button Mushrooms - ₹180/kg' },
    { id: 'fresh-2', label: 'Oyster Mushrooms - ₹220/kg' },
    { id: 'fresh-3', label: 'Shiitake Mushrooms - ₹280/kg' },
    { id: 'dried-1', label: 'Dried Button Mushrooms - ₹950/kg' },
    { id: 'dried-2', label: 'Dried Shiitake - ₹1,200/kg' },
    { id: 'dried-3', label: 'Mushroom Powder Mix - ₹890/kg' },
    { id: 'pkg-1', label: 'Corrugated Cardboard Boxes - ₹25/box' },
    { id: 'pkg-2', label: 'Kraft Paper Bags - ₹8/bag' },
    { id: 'pkg-3', label: 'Vacuum Sealing Bags - ₹35/100pcs' },
  ];

  const serviceOptions = [
    { id: 'clean', label: 'Solar Panel Cleaning - ₹500/panel' },
    { id: 'maintain', label: 'System Maintenance - ₹2,000/visit' },
    { id: 'monitor', label: 'Performance Monitoring - ₹999/month' },
    { id: 'basic-amc', label: 'Basic AMC - ₹4,999/year' },
    { id: 'premium-amc', label: 'Premium AMC - ₹9,999/year' },
    { id: 'enterprise-amc', label: 'Enterprise AMC - Custom Pricing' },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!validatePhoneNumber(formData.mobile)) newErrors.mobile = 'Valid 10-digit phone number required';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email address required';
    if (!formData.product) newErrors.product = 'Please select a product or service';
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (json.status === 'success') {
        setSubmitted(true);
        setFormData({
          name: user?.name || '',
          mobile: user?.phone || '',
          email: user?.email || '',
          type: 'product',
          product: '',
          quantity: '',
          message: '',
        });
        
        // Auto-dismiss success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(json.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-96 flex items-center justify-center relative overflow-hidden pt-20 bg-gradient-to-br from-primary-50 to-mushroom-50 dark:from-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary-300 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl font-bold mb-4 gradient-text text-center px-4">Get in Touch</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 text-center max-w-2xl px-4">
            Have questions about our products or services? Fill out the form below and we&apos;ll get back to you
            promptly.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="section-container max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              {[
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+91 9876 543 210',
                  href: 'tel:+919876543210',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'info@businesshub.com',
                  href: 'mailto:info@businesshub.com',
                },
              ].map(({ icon: Icon, label, value, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card hover:shadow-lg transition-all block group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card"
              >
                <h3 className="font-bold mb-3">Business Hours</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                  <li>Saturday: 10:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700/50 rounded-lg flex items-center gap-3"
              >
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-green-900 dark:text-green-300">Thank you!</p>
                  <p className="text-sm text-green-800 dark:text-green-400">
                    We&apos;ve received your enquiry. Our team will contact you within 24 hours.
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="input-field"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="input-field"
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.mobile}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="input-field"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Type Selector */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'product', product: '' })}
                  className={`py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
                    formData.type === 'product'
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  Products
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'service', product: '' })}
                  className={`py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
                    formData.type === 'service'
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  Services
                </button>
              </div>

              {/* Product/Service Selection */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {formData.type === 'product' ? 'Select Product' : 'Select Service'} *
                </label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="input-field"
                >
                  <option value="">
                    {formData.type === 'product' ? 'Choose a product...' : 'Choose a service...'}
                  </option>
                  {(formData.type === 'product' ? productOptions : serviceOptions).map(({ id, label }) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.product && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.product}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold mb-2">Quantity Required *</label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g., 100 kg, 50 panels, 1000 boxes"
                  className="input-field"
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.quantity}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold mb-2">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your requirements..."
                  rows={4}
                  className="input-field resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Enquiry
                  </>
                )}
              </button>

              <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                We respect your privacy. Your information will be kept confidential.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-container bg-gradient-to-r from-mushroom-50 to-primary-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl">
        <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Frequently Asked Questions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: 'What is your response time?',
              a: 'We typically respond to all enquiries within 24 hours, often sooner during business hours.',
            },
            {
              q: 'Do you offer bulk discounts?',
              a: 'Yes! We offer competitive bulk pricing. Contact us for customized quotes.',
            },
            {
              q: 'What is your delivery coverage?',
              a: 'We deliver across India with temperature-controlled logistics for fresh products.',
            },
            {
              q: 'Can I customize the package?',
              a: 'Absolutely. We specialize in customized solutions for businesses of all sizes.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card"
            >
              <h4 className="font-bold mb-2">{item.q}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
