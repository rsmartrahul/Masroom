'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { motion } from '@/components/Motion';

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <>
      <section className="min-h-96 flex items-center justify-center relative overflow-hidden pt-20 bg-gradient-to-br from-primary-50 to-mushroom-50 dark:from-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary-300 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl font-bold mb-4 text-center px-4 gradient-text">Your Cart</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 text-center max-w-2xl px-4">
            Review selected products, adjust quantities, and continue to enquiry when you&apos;re ready.
          </p>
        </motion.div>
      </section>

      <section className="section-container">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card text-center"
          >
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold mb-3">Cart is empty</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
              Add products from the products page and they will appear here right away.
            </p>
            <Link href="/products" className="btn-primary inline-flex items-center justify-center gap-2">
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-4xl flex-shrink-0">
                      {item.image}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{item.unit}</p>
                        </div>
                        <p className="text-xl font-bold gradient-text">{item.price}</p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="min-w-12 px-3 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <aside className="glass-card h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Items</span>
                  <span className="font-semibold">{itemCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <span className="font-semibold">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                  <span className="font-semibold">On enquiry</span>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 my-6 pt-4 flex items-center justify-between">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold gradient-text">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div className="space-y-3">
                <Link href="/enquiry" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                  Proceed to Enquiry
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={clearCart}
                  className="btn-secondary w-full inline-flex items-center justify-center gap-2"
                >
                  Clear Cart
                </button>
                <Link href="/products" className="btn-ghost w-full inline-flex items-center justify-center">
                  Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
