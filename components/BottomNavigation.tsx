'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Zap, MessageSquare, User } from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: ShoppingBag },
    { name: 'Services', href: '/services', icon: Zap },
    { name: 'Enquiry', href: '/enquiry', icon: MessageSquare },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-around">
          {tabs.map(({ name, href, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== '/' && pathname.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">{name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
