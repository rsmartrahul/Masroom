'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Loader2, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface CartOrder {
  _id: string;
  userName: string;
  userEmail: string;
  productName: string;
  category: string;
  price: string;
  quantity: number;
  action: string;
  createdAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function CartOrdersView() {
  const [orders, setOrders] = useState<CartOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/cart-orders`);
      const json = await res.json();
      if (json.status === 'success') {
        setOrders(json.data);
      }
    } catch (error) {
      console.error('Failed to load cart orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-emerald-600" />
          Live Cart Activity
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">Track products added to carts by users in real-time</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Product Added</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                    No cart activity found yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{order.userName}</div>
                      <div className="text-xs text-slate-500">{order.userEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-emerald-700">{order.productName}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{order.category}</div>
                    </td>
                    <td className="px-6 py-4 font-bold">{order.price}</td>
                    <td className="px-6 py-4 font-medium">{order.quantity}</td>
                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
