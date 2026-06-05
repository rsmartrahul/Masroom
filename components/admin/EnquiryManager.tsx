'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Loader2, CheckCircle2, Clock, Phone, AlertCircle } from 'lucide-react';

interface Enquiry {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  type: string;
  product: string;
  quantity: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function EnquiryManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/enquiries`);
      const json = await res.json();
      if (json.status === 'success') {
        setEnquiries(json.data);
      }
    } catch {
      showToast('error', 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const updateStatus = async (id: string, status: 'new' | 'contacted' | 'resolved') => {
    try {
      const res = await fetch(`${API_BASE}/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.status === 'success') {
        showToast('success', 'Status updated successfully');
        fetchEnquiries();
      }
    } catch {
      showToast('error', 'Failed to update status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">New</span>;
      case 'contacted':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">Contacted</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Resolved</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-bold border ${
            toast.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {toast.message}
        </div>
      )}

      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Mail className="w-5 h-5 text-emerald-600" />
          Enquiry Submissions
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">Manage customer inquiries and requests</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Request Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{enquiry.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" /> {enquiry.email}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" /> {enquiry.mobile}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{enquiry.product}</div>
                      <div className="text-xs mt-1">
                        <span className="font-semibold text-slate-500">Qty:</span> {enquiry.quantity}
                      </div>
                      <div className="text-xs mt-1 text-slate-500 line-clamp-2 max-w-xs">{enquiry.message}</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">{getStatusBadge(enquiry.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={enquiry.status}
                        onChange={(e) => updateStatus(enquiry._id, e.target.value as any)}
                        className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      >
                        <option value="new">Mark New</option>
                        <option value="contacted">Mark Contacted</option>
                        <option value="resolved">Mark Resolved</option>
                      </select>
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
