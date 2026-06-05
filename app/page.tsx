'use client';

import { motion } from '@/components/Motion';
import Link from 'next/link';
import { ArrowRight, Leaf, Zap, CheckCircle2, Award, Users, Target, Lightbulb, Shield } from 'lucide-react';
import { PremiumHeroCarousel } from '@/components/PremiumHeroCarousel';

export default function Home() {

  return (
    <>
      {/* Premium Hero Carousel Section */}
      <PremiumHeroCarousel />

      {/* About Us Section */}
      <section className="section-container">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-200/80 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-200">
                  <Target className="w-4.5 h-4.5" />
                  About Our Company
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-950 dark:text-white">
                Pioneering Premium Solutions for Modern Business
              </h2>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Founded with a vision to revolutionize India&apos;s agricultural and sustainable energy landscape, we pride ourselves on delivering excellence across two core business verticals.
              </p>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                With years of industry expertise and a commitment to quality, we&apos;ve built strong relationships with thousands of businesses, making us the trusted partner for premium mushroom products and professional solar maintenance services.
              </p>

              <div className="space-y-4">
                {[
                  { label: 'Mission', value: 'Deliver premium quality products and services' },
                  { label: 'Vision', value: 'Be India\'s most trusted sustainable business partner' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 shadow-md shadow-primary-600/10">
                        <Lightbulb className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-base">{item.label}</p>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
              
              <div className="relative glass-card overflow-hidden">
                <div className="grid grid-cols-2 gap-4 p-4 sm:p-6">
                  {[
                    { icon: Award, label: '15+ Years', sublabel: 'Industry Experience' },
                    { icon: Users, label: '5000+', sublabel: 'Happy Clients' },
                    { icon: Target, label: '100%', sublabel: 'Commitment to Quality' },
                    { icon: Shield, label: 'ISO', sublabel: 'Certified Standards' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="text-center p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/40 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <item.icon className="w-10 h-10 mx-auto mb-3 text-primary-600 dark:text-primary-400" />
                      <p className="font-bold text-slate-900 dark:text-white text-lg">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.sublabel}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-container">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200/80 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-200">
                <Lightbulb className="w-4.5 h-4.5" />
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-950 dark:text-white">Why We Stand Out</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Experience the difference with our commitment to excellence, innovation, and customer satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: 'Premium Quality',
                description: 'Rigorous quality control processes ensure only the best products reach our clients',
              },
              {
                icon: Users,
                title: 'Customer Centric',
                description: 'Dedicated support team available 24/7 to address your needs and concerns',
              },
              {
                icon: Target,
                title: 'Reliable Delivery',
                description: 'On-time, on-point delivery with real-time tracking and updates',
              },
              {
                icon: Shield,
                title: 'Certified & Verified',
                description: 'ISO certified operations with adherence to all industry standards',
              },
              {
                icon: Lightbulb,
                title: 'Innovation Driven',
                description: 'Continuously improving our products and services with latest technology',
              },
              {
                icon: CheckCircle2,
                title: 'Long Term Partnership',
                description: 'Building lasting relationships with customized solutions for your business',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group glass-card overflow-hidden hover:shadow-xl hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-r from-primary-500 to-primary-300 opacity-10 group-hover:opacity-20 transition-opacity blur-2xl" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md shadow-primary-600/15">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Business Overview */}
      <section className="section-container">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold mb-4 gradient-text">Our Expertise</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-2xl leading-relaxed">
            We specialize in providing high-quality mushroom products and professional solar panel maintenance
            services to businesses across India.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mushroom Business */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card border border-slate-100 dark:border-slate-800/40 hover:border-primary-500/20"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-primary-600/10">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Mushroom & Packaging</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">
                Premium fresh mushrooms, dried mushrooms, and eco-friendly packaging solutions designed for bulk orders
                and commercial use.
              </p>
              <Link href="/products" className="text-primary-600 dark:text-primary-400 font-bold inline-flex items-center gap-2 hover:gap-3 transition-all text-sm">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Solar Business */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card border border-slate-100 dark:border-slate-800/40 hover:border-amber-500/20"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-amber-500/10">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Solar Panel Services</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">
                Professional solar panel cleaning, maintenance, and AMC plans to keep your solar installations running at
                peak efficiency.
              </p>
              <Link href="/services" className="text-primary-600 dark:text-primary-400 font-bold inline-flex items-center gap-2 hover:gap-3 transition-all text-sm">
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Statistics */}
      <section className="section-container bg-gradient-to-r from-mushroom-50 to-primary-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Our Impact</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '5000+', label: 'Happy Customers', icon: '😊' },
              { value: '50 Tons', label: 'Products Delivered', icon: '📦' },
              { value: '10000+', label: 'Panels Maintained', icon: '⚡' },
              { value: '99.8%', label: 'Satisfaction Rate', icon: '⭐' },
            ].map(({ value, label, icon }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{icon}</div>
                <p className="text-3xl font-bold mb-1 gradient-text">{value}</p>
                <p className="text-slate-600 dark:text-slate-400">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="section-container">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">What Our Clients Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Farm Manager',
                content:
                  'Excellent quality mushrooms and prompt delivery. Our customers love the product quality and freshness.',
                avatar: '👨‍🌾',
              },
              {
                name: 'Priya Singh',
                role: 'Hotel Owner',
                content:
                  'The dried mushrooms are premium quality. Perfect for our restaurant needs. Highly recommended!',
                avatar: '👩‍💼',
              },
              {
                name: 'Amit Patel',
                role: 'Solar Facility Manager',
                content:
                  'Outstanding solar panel maintenance service. Our efficiency increased by 18% after their cleaning.',
                avatar: '👨‍💻',
              },
            ].map(({ name, role, content, avatar }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{avatar}</span>
                  <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{role}</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 italic">&quot;{content}&quot;</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-card text-center"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Ready to Grow Your Business?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Connect with us today to discuss your needs. We offer customized solutions for bulk orders and long-term
            partnerships.
          </p>
          <Link href="/enquiry" className="btn-primary inline-flex items-center justify-center group">
            Send Enquiry
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
