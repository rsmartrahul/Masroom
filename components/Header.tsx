'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeContext } from './ThemeProvider';
import { Menu, Moon, ShoppingCart, Sun, X, Leaf, Zap, User, Home, ArrowRight, LogOut } from 'lucide-react';
import { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { useCart } from './CartProvider';
import { useAuth } from './AuthProvider';

export function Header() {
  const { theme, toggleTheme } = useThemeContext();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Leaf },
    { name: 'Services', href: '/services', icon: Zap },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <BrandLogo size={48} className="h-12 w-12 shadow-md ring-1 ring-white/60 dark:ring-slate-800/60 group-hover:scale-105 transition-transform" />
            <div className="hidden sm:block">
              <p className="font-bold text-lg leading-none gradient-text">Business Hub</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mushroom & Solar Services</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 px-2 py-2 shadow-lg">
            {navItems.map(({ name, href, icon: Icon }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    active
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {itemCount > 0 ? (
                <span className="min-w-5 h-5 px-1 rounded-full bg-primary-600 text-white text-[10px] leading-5 text-center font-bold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              ) : null}
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <Sun className="w-5 h-5 text-slate-300" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link
              href="/enquiry"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-600 to-mushroom-600 text-white text-sm font-semibold shadow-lg shadow-primary-600/20 hover:opacity-95 transition-opacity"
            >
              Get Equiry
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-slate-200">
                    {user?.name}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg p-2 z-50">
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-opacity"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="lg:hidden border-t border-slate-200/70 dark:border-slate-800/70 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            {navItems.map(({ name, href, icon: Icon }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {name}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}

            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="flex items-center gap-3">
                <ShoppingCart className="w-4 h-4" />
                Cart
              </span>
              {itemCount > 0 ? (
                <span className="min-w-5 h-5 px-1 rounded-full bg-primary-600 text-white text-[10px] leading-5 text-center font-bold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              ) : (
                <ArrowRight className="w-4 h-4 opacity-70" />
              )}
            </Link>

            <Link
              href="/enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-mushroom-600 text-white text-sm font-semibold shadow-lg shadow-primary-600/20"
            >
              Get Quote
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Auth Section */}
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <User className="w-4 h-4" />
                    {user?.name}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
