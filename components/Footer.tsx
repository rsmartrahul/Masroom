'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <BrandLogo size={96} className="h-20 w-20 shadow-lg ring-1 ring-white/10" />
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Premium products and services for sustainable living and green energy.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/enquiry" className="hover:text-white transition-colors">
                  Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 9876 543 210
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@businesshub.com" className="hover:text-white transition-colors">
                  info@businesshub.com
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; 2024 Business Hub. All rights reserved.</p>
          <p>Crafted with precision for modern businesses</p>
        </div>
      </div>
    </footer>
  );
}
