'use client';

import { motion } from '@/components/Motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Check, Zap, Wrench, Shield, TrendingUp, Sun, Droplets, Sparkles, Cpu, Gauge } from 'lucide-react';

export default function ServicesPage() {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'enterprise'>('basic');

  const services = [
    {
      icon: Zap,
      title: 'Solar Panel Cleaning',
      description: 'Professional cleaning services to maximize energy output and system efficiency.',
      features: ['Water-free cleaning', 'Gentle on panels', 'Scheduled maintenance', 'Quick turnaround'],
      price: '₹500',
      unit: 'per panel',
    },
    {
      icon: Wrench,
      title: 'System Maintenance',
      description: 'Comprehensive inspection and maintenance of your entire solar installation.',
      features: ['Full inspection', 'Performance testing', 'Repairs included', 'Report provided'],
      price: '₹2,000',
      unit: 'per visit',
    },
    {
      icon: Shield,
      title: 'Performance Monitoring',
      description: 'Real-time monitoring and alerts for optimal system performance tracking.',
      features: ['24/7 monitoring', 'Alert system', 'Monthly reports', 'Expert support'],
      price: '₹999',
      unit: 'per month',
    },
  ];

  const amcPlans = [
    {
      id: 'basic',
      name: 'Basic AMC',
      price: '₹4,999',
      period: '/year',
      description: 'Essential maintenance for small installations',
      features: [
        'Quarterly cleaning',
        'Basic inspection',
        'Emergency support',
        'Email reports',
        'Up to 5 panels',
      ],
      icon: '🟢',
      popular: false,
    },
    {
      id: 'premium',
      name: 'Premium AMC',
      price: '₹9,999',
      period: '/year',
      description: 'Comprehensive coverage for medium installations',
      features: [
        'Bi-monthly cleaning',
        'Full inspection',
        'Priority support',
        'Real-time monitoring',
        'Up to 20 panels',
        'Performance guarantee',
        '24/7 helpline',
      ],
      icon: '🔵',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise AMC',
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored solutions for large installations',
      features: [
        'Monthly cleaning',
        'Advanced monitoring',
        'Dedicated support',
        'Custom schedules',
        'Unlimited panels',
        'Performance optimization',
        '24/7 on-site support',
        'Insurance coverage',
      ],
      icon: '⭐',
      popular: false,
    },
  ];

  const benefits = [
    {
      title: 'Increased Efficiency',
      description: 'Regular cleaning increases energy output by up to 25%',
      metric: '+25%',
    },
    {
      title: 'Extended Lifespan',
      description: 'Proper maintenance extends panel life by 10+ years',
      metric: '+10yrs',
    },
    {
      title: 'Cost Savings',
      description: 'Preventive maintenance reduces emergency repairs',
      metric: '-40%',
    },
    {
      title: 'Performance Guarantee',
      description: 'Guaranteed minimum performance standards',
      metric: '99.5%',
    },
  ];

  return (
    <>
      {/* Redesigned Premium Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/50 dark:border-slate-800/30">
        {/* Glowing Decorative Background spots */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] dark:bg-primary-500/5" />
          <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-solar-500/10 rounded-full blur-[100px] dark:bg-solar-500/5" />
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
        </div>

        <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-solar-200 bg-solar-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-solar-700 dark:border-solar-500/20 dark:bg-solar-500/10 dark:text-solar-300 backdrop-blur"
              >
                <Sun className="h-4 w-4 text-solar-500" />
                <span>Premium Solar Care Vertical</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.1]">
                  Maximize Your <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-primary-600 via-solar-500 to-primary-500 bg-clip-text text-transparent">
                    Solar Panel Yield
                  </span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Keep your solar installations operating at peak performance. Professional deionized water-washing, performance checks, and live AMC tracking designed for maximum energy output.
                </p>
              </motion.div>

              {/* Bullet Points */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl"
              >
                {[
                  { icon: Droplets, color: 'text-primary-500 bg-primary-500/10', title: 'Water-Free & Pure Water Cleaning', desc: 'No spots or residue' },
                  { icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10', title: '+25% Guaranteed Output', desc: 'Instant efficiency gain' },
                  { icon: Shield, color: 'text-solar-500 bg-solar-500/10', title: 'All-Risk AMC Coverage', desc: 'Certified technicians' },
                  { icon: Cpu, color: 'text-purple-500 bg-purple-500/10', title: 'Live Performance Sync', desc: 'Smart status reports' },
                ].map((item, index) => {
                  const BulletIcon = item.icon;
                  return (
                    <div key={index} className="flex gap-3 items-start p-3.5 rounded-xl border border-slate-200/50 bg-white/60 dark:border-slate-800/50 dark:bg-slate-900/40 backdrop-blur-sm">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${item.color}`}>
                        <BulletIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{item.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md"
              >
                <Link
                  href="/enquiry?service=solar"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 px-6 py-4 font-bold transition-all shadow-lg shadow-primary-500/20 active:scale-95"
                >
                  Book Visit <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#amc-plans"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 px-6 py-4 font-bold text-slate-800 dark:text-slate-200 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/80 backdrop-blur-sm"
                >
                  Explore AMC Plans
                </Link>
              </motion.div>

              {/* Quick Trust Statistics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-8 text-sm"
              >
                <div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">10,000+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Panels Serviced</p>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
                <div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">99.8%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Client Trust Rate</p>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
                <div>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none">+25%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Yield Increase</p>
                </div>
              </motion.div>
            </div>

            {/* Right Graphics/Dashboard Column */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mx-auto w-full max-w-[460px] lg:max-w-none"
              >
                {/* Visual Glass Card Dashboard Container */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white/70 p-6 shadow-[0_32px_80px_rgba(15,23,42,0.1)] dark:border-slate-800/80 dark:bg-slate-900/60 backdrop-blur-xl">
                  
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase ml-2">Clean-Sync v2.1</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 dark:bg-emerald-500/10">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Live System Sync</span>
                    </div>
                  </div>

                  {/* High Tech Interactive Solar Panel Array Mockup */}
                  <div className="relative rounded-2xl bg-slate-950 p-5 shadow-inner border border-slate-800 overflow-hidden">
                    {/* Glowing Grid rays effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_70%)]" />

                    {/* Solar Panel Cells Grid */}
                    <div className="grid grid-cols-3 gap-2 relative z-10">
                      {Array.from({ length: 9 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="h-16 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-sky-950/80 relative overflow-hidden group/cell"
                        >
                          {/* Inner cell lines texture */}
                          <div className="absolute inset-0 grid grid-cols-2 gap-px opacity-30">
                            <div className="border-r border-slate-700" />
                            <div className="border-l border-slate-700" />
                          </div>
                          
                          {/* Glow overlay */}
                          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 to-solar-500 opacity-60" />
                        </div>
                      ))}
                    </div>

                    {/* Water cleaning Sweep overlay line */}
                    <motion.div
                      animate={{
                        top: ['-10%', '110%'],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        repeatDelay: 1,
                      }}
                      className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px] z-20 shadow-[0_0_12px_#22d3ee]"
                    />

                    {/* Shiny Dust Sparkles indicator dots */}
                    <motion.div
                      animate={{
                        opacity: [0.1, 0.8, 0.1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute top-1/4 left-1/3 h-2 w-2 rounded-full bg-solar-400 blur-[1px] z-30"
                    />
                    <motion.div
                      animate={{
                        opacity: [0.8, 0.1, 0.8],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                      }}
                      className="absolute bottom-1/4 right-1/4 h-1.5 w-1.5 rounded-full bg-cyan-400 blur-[1px] z-30"
                    />
                  </div>

                  {/* Dashboard Bottom Widgets */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    
                    {/* Performance Yield Boost Widget */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">Yield Boost</span>
                        <Gauge className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="mt-2">
                        <p className="text-2xl font-black text-slate-900 dark:text-white">+25.8%</p>
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                          <Check className="h-3 w-3" />
                          <span>Guaranteed Peak</span>
                        </div>
                      </div>
                    </div>

                    {/* Active Maintenance Status Widget */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">Dust Index</span>
                        <Sun className="h-4 w-4 text-solar-500" />
                      </div>
                      <div className="mt-2">
                        <p className="text-2xl font-black text-slate-900 dark:text-white">0.0%</p>
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-primary-600 dark:text-primary-400 mt-1">
                          <Sparkles className="h-3 w-3" />
                          <span>Pristine Clean</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Absolutely positioned floating badges around the dashboard */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 rounded-2xl bg-white border border-slate-200/70 dark:bg-slate-900 dark:border-slate-800 p-3.5 shadow-lg flex items-center gap-3 backdrop-blur z-20"
                >
                  <div className="h-10 w-10 rounded-xl bg-solar-500/10 flex items-center justify-center text-solar-600 dark:text-solar-400">
                    <Sun className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Solar Gain</p>
                    <p className="text-xs font-black text-slate-900 dark:text-white">+1,240 kWh</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-4 -left-6 rounded-2xl bg-white border border-slate-200/70 dark:bg-slate-900 dark:border-slate-800 p-3.5 shadow-lg flex items-center gap-3 backdrop-blur z-20"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Scheduled Clean</p>
                    <p className="text-xs font-black text-slate-900 dark:text-white">Active AMC</p>
                  </div>
                </motion.div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container">
        <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card group hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-solar-400 to-solar-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg mb-4">
                  <p className="text-3xl font-bold gradient-text">{service.price}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{service.unit}</p>
                </div>

                <Link
                  href="/enquiry?service=solar"
                  className="w-full py-2 px-3 bg-solar-500 hover:bg-solar-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Get Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-container bg-gradient-to-r from-solar-50 to-primary-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl">
        <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Why Choose Us?</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card text-center"
            >
              <p className="text-4xl font-bold gradient-text mb-2">{benefit.metric}</p>
              <h4 className="font-bold mb-2">{benefit.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AMC Plans */}
      <section className="section-container">
        <h2 className="text-4xl font-bold mb-4 text-center gradient-text">Annual Maintenance Contracts</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
          Choose from our flexible AMC plans or customize one for your specific needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {amcPlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`glass-card relative transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105 shadow-2xl' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-solar-600 to-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="text-4xl mb-4">{plan.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{plan.description}</p>

              <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p className="text-3xl font-bold gradient-text">{plan.price}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{plan.period}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/enquiry?plan=${plan.id}`}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-solar-600 to-solar-700 text-white hover:shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section-container">
        <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Our Process</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Assessment',
              description: 'We evaluate your solar installation and current performance.',
            },
            {
              step: '02',
              title: 'Planning',
              description: 'Customized maintenance schedule based on your needs.',
            },
            {
              step: '03',
              title: 'Execution',
              description: 'Professional cleaning and maintenance by certified teams.',
            },
            {
              step: '04',
              title: 'Monitoring',
              description: 'Continuous performance tracking and regular reports.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="glass-card mb-4">
                <p className="text-4xl font-bold gradient-text mb-4">{item.step}</p>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:flex justify-end mb-4">
                  <ArrowRight className="w-8 h-8 text-primary-600 dark:text-primary-400 transform -rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-container bg-gradient-to-r from-solar-50 to-primary-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl">
        <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Client Success Stories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              company: 'Green Solar Inc.',
              location: 'Delhi',
              result: '18% efficiency increase',
              testimonial:
                'Outstanding service! Within 3 months of their maintenance, our panel efficiency jumped from 78% to 96%. Highly professional team.',
              avatar: '🏢',
            },
            {
              company: 'Eco Power Solutions',
              location: 'Mumbai',
              result: 'Reduced downtime by 95%',
              testimonial:
                'Their monitoring system alerts us immediately to any issues. We have virtually zero downtime now.',
              avatar: '⚡',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{item.avatar}</span>
                <div>
                  <p className="font-bold">{item.company}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.location}</p>
                </div>
              </div>
              <p className="text-primary-600 dark:text-primary-400 font-bold mb-4">📈 {item.result}</p>
              <p className="text-slate-600 dark:text-slate-400 italic">&quot;{item.testimonial}&quot;</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-card text-center"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Ready to Maximize Your Solar Investment?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Get a free assessment of your current system and discover how our services can improve efficiency and
            reduce costs.
          </p>
          <Link href="/enquiry?service=solar" className="btn-primary inline-flex items-center justify-center group">
            Schedule Free Assessment
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
