'use client';

import React, { useState, useEffect } from 'react';
import { motion } from '@/components/Motion';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Award,
  Users,
  Globe,
  ShieldCheck,
  Scale,
  User as UserIcon,
  Lock,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building2,
  KeyRound,
} from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { useAuth } from '@/components/AuthProvider';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ProfilePage() {
  const { user, isAuthenticated, updateUserContext } = useAuth();
  
  // Tabs: 'account' or 'company'
  const [activeTab, setActiveTab] = useState<'account' | 'company'>('company');

  // Edit states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phone || '');
      setActiveTab('account'); // Default to personal account tab if logged in
    } else {
      setActiveTab('company'); // Default to company profile tab if guest
    }
  }, [user]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('error', 'Name and Email are required.');
      return;
    }

    if (password && password !== confirmPassword) {
      showToast('error', 'Passwords do not match.');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('business-hub-token');
      const body: any = { name, email, phoneNumber };
      if (password) body.password = password;

      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (json.status === 'success') {
        showToast('success', 'Profile updated successfully!');
        // Update context & local storage
        updateUserContext({
          id: json.data.user.id,
          name: json.data.user.name,
          email: json.data.user.email,
          role: json.data.user.role,
          phone: json.data.user.phoneNumber,
        });
        setPassword('');
        setConfirmPassword('');
      } else {
        showToast('error', json.message || 'Failed to update profile.');
      }
    } catch {
      showToast('error', 'Server error. Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'admin':
        return <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-bold uppercase border border-purple-200 dark:border-purple-800/50">Admin</span>;
      case 'executive':
        return <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded-full text-xs font-bold uppercase border border-sky-200 dark:border-sky-800/50">Executive</span>;
      default:
        return <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase border border-emerald-200 dark:border-emerald-800/50">User</span>;
    }
  };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-bold border ${
            toast.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
          style={{ animation: 'slideIn 0.3s ease' }}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          {toast.message}
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-72 flex items-center justify-center relative overflow-hidden pt-20 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-950 dark:to-slate-900">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-300 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="text-center px-4">
            <div className="mx-auto mb-4 w-28 h-28 rounded-[2rem] bg-white/80 dark:bg-slate-900/60 p-2 shadow-2xl backdrop-blur border border-white/60 dark:border-slate-700/40 flex items-center justify-center">
              <BrandLogo size={96} className="h-24 w-24" />
            </div>
            <h1 className="text-4xl font-extrabold mb-2 gradient-text">Pravin Enterprise Hub</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Premium E-Commerce Mushroom Cultivation & Sustainable Solar Energy washings.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Tab Switcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-center border-b border-slate-200 dark:border-slate-800">
          <div className="flex gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all duration-300 ${
                  activeTab === 'account'
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                My Account
              </button>
            )}
            <button
              onClick={() => setActiveTab('company')}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all duration-300 ${
                activeTab === 'company'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Company Profile
            </button>
          </div>
        </div>
      </section>

      {/* TAB CONTENT: MY ACCOUNT */}
      {activeTab === 'account' && isAuthenticated && (
        <section className="section-container !py-12 max-w-5xl mx-auto">
          {/* ── Profile Details Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl mb-8"
          >
            {/* Cover / banner */}
            <div className="h-36 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.18),transparent_60%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/60 dark:from-slate-900/60 to-transparent" />
            </div>

            <div className="relative px-6 md:px-10 pb-8">
              {/* Avatar positioned over the banner edge */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-black text-5xl shadow-2xl shadow-emerald-600/30 border-4 border-white dark:border-slate-900 shrink-0">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-2.5">
                      {user?.name}
                      {getRoleBadge(user?.role)}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{user?.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Admin Panel
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Details grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Full Name</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Email</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white truncate">{user?.email || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Phone</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white truncate">{user?.phone || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Role</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white capitalize">{user?.role || 'user'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Edit Profile Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Profile</h3>
                <p className="text-xs text-slate-500">Update your personal details and password</p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Role (read-only) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Account Role
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user?.role?.toUpperCase() || 'USER'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-500 text-sm font-bold uppercase tracking-widest cursor-not-allowed select-none"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-4">
                  <KeyRound className="w-4 h-4 text-emerald-600" />
                  Change Password
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="password"
                        placeholder="Leave blank to keep current"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="password"
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </section>
      )}

      {/* TAB CONTENT: COMPANY PROFILE */}
      {activeTab === 'company' && (
        <>
          {/* Company Info */}
          <section className="section-container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
            >
              {/* Mission */}
              <motion.div variants={itemVariants} className="glass-card">
                <Globe className="w-10 h-10 text-mushroom-600 dark:text-mushroom-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  To deliver premium quality products and professional services that empower businesses to grow
                  sustainably while maintaining the highest standards of excellence and customer satisfaction.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div variants={itemVariants} className="glass-card">
                <Award className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  To become the most trusted partner for mushroom products and solar maintenance services,
                  recognized for innovation, sustainability, and exceptional customer value across India.
                </p>
              </motion.div>

              {/* Values */}
              <motion.div variants={itemVariants} className="glass-card">
                <Users className="w-10 h-10 text-solar-600 dark:text-solar-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Quality, Integrity, Innovation, and Customer-First approach. We believe in building long-term
                  relationships through transparency, reliability, and exceptional service delivery.
                </p>
              </motion.div>
            </motion.div>
          </section>

          <section className="section-container !py-0 mb-16">
            <h2 className="text-3xl font-extrabold mb-8 text-center gradient-text">Legal Declarations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} initial="hidden" whileInView="visible" className="glass-card">
                <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Privacy Policy</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  See how we collect, store, and use account data across the web and mobile app.
                </p>
                <Link href="/privacy-policy" className="btn-primary inline-flex items-center justify-center">
                  View Privacy Policy
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} initial="hidden" whileInView="visible" className="glass-card">
                <Scale className="w-10 h-10 text-sky-600 dark:text-sky-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Terms and Conditions</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Read the rules for using our platform, accounts, services, and support channels.
                </p>
                <Link href="/terms" className="btn-secondary inline-flex items-center justify-center">
                  View Terms
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Company Details */}
          <section className="section-container bg-gradient-to-r from-mushroom-50 to-primary-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl mb-16">
            <h2 className="text-3xl font-extrabold mb-8 text-center gradient-text">Company Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Founded', value: '2020', icon: '📅' },
                { label: 'Team Size', value: '50+ Professionals', icon: '👥' },
                { label: 'Coverage', value: 'Pan-India', icon: '🗺️' },
                { label: 'Certifications', value: 'ISO & FSSAI', icon: '✅' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card text-center"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{item.label}</p>
                  <p className="font-bold text-lg">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="section-container mb-16">
            <h2 className="text-3xl font-extrabold mb-8 text-center gradient-text">Get In Touch</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Office Address</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Connaught Place,
                      <br />
                      New Delhi - 110001
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-mushroom-100 dark:bg-mushroom-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-mushroom-600 dark:text-mushroom-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Phone</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">+91 9876 543 210</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">+91 9123 456 789</p>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-solar-100 dark:bg-solar-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-solar-600 dark:text-solar-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Email</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">info@businesshub.com</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">support@businesshub.com</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Social Media */}
          <section className="section-container bg-gradient-to-r from-primary-50 to-mushroom-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl mb-16">
            <h2 className="text-3xl font-extrabold mb-6 text-center gradient-text">Connect With Us</h2>

            <div className="flex justify-center gap-6">
              {[
                { icon: Facebook, label: 'Facebook', url: '#', color: 'text-blue-600' },
                { icon: Twitter, label: 'Twitter', url: '#', color: 'text-sky-500' },
                { icon: Instagram, label: 'Instagram', url: '#', color: 'text-pink-600' },
                { icon: Linkedin, label: 'LinkedIn', url: '#', color: 'text-blue-700' },
              ].map(({ icon: Icon, label, url, color }, idx) => (
                <motion.a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`p-4 bg-white dark:bg-slate-800 rounded-full ${color} hover:shadow-lg transition-all`}
                  title={label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="section-container">
            <h2 className="text-3xl font-extrabold mb-8 text-center gradient-text">Why Choose Us?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Premium Quality',
                  description: 'All products are certified and meet international quality standards.',
                  icon: '⭐',
                },
                {
                  title: 'Expert Team',
                  description: 'Experienced professionals with years of industry expertise.',
                  icon: '👨‍💼',
                },
                {
                  title: 'Fast Service',
                  description: 'Quick response times and reliable delivery across India.',
                  icon: '⚡',
                },
                {
                  title: 'Competitive Pricing',
                  description: 'Best prices with special discounts for bulk orders.',
                  icon: '💰',
                },
                {
                  title: 'Sustainability',
                  description: 'Eco-friendly practices and sustainable business models.',
                  icon: '🌱',
                },
                {
                  title: '24/7 Support',
                  description: 'Round-the-clock customer support for all enquiries.',
                  icon: '🤝',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-card text-center"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
