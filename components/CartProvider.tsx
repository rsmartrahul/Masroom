'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: string;
  unit: string;
  image: string;
  category: string;
  quantity: number;
};

type CartInput = Omit<CartItem, 'quantity'>;

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartInput) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = 'business-hub-cart';

function parsePrice(price: string) {
  const digits = price.replace(/[^0-9.]/g, '');
  const value = Number(digits);
  return Number.isFinite(value) ? value : 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const addToCart = async (item: CartInput) => {
    // Optimistically update local state
    setItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });

    // Fire and forget: log to backend analytics
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Try to get user from local storage
      let user = null;
      try {
        const saved = localStorage.getItem('business-hub-user');
        if (saved) user = JSON.parse(saved);
      } catch (e) {}

      await fetch(`${API_BASE}/api/admin/cart-orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          userEmail: user?.email,
          userName: user?.name,
          productId: item.id,
          productName: item.name,
          category: item.category,
          price: item.price,
          quantity: 1, // Log the addition
          action: 'add_to_cart'
        }),
      });
    } catch (error) {
      console.error('Failed to log cart event:', error);
    }
  };

  const removeFromCart = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const value = useMemo(() => {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

    return { items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, total };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
