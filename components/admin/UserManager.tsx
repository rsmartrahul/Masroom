'use client';

import React, { useState, useEffect } from 'react';
import { Users, Loader2, Mail, Phone, Calendar, Edit3, Trash2, X, Save, ShieldAlert, AlertCircle, CheckCircle2 } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit Modal & Form states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', role: '' });
  const [saving, setSaving] = useState(false);
  
  // Toast notifications
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/users`);
      const json = await res.json();
      if (json.status === 'success') {
        setUsers(json.data);
      }
    } catch (error) {
      console.error('Failed to load users');
      showToast('error', 'Failed to fetch registered users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="px-2.5 py-1 bg-purple-100 text-purple-700 border border-purple-200 rounded-full text-xs font-bold uppercase tracking-wider">Admin</span>;
      case 'executive':
        return <span className="px-2.5 py-1 bg-sky-100 text-sky-700 border border-sky-200 rounded-full text-xs font-bold uppercase tracking-wider">Executive</span>;
      default:
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">User</span>;
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
      role: user.role || 'user',
    });
    setIsEditOpen(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setSaving(true);

    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${editingUser._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.status === 'success') {
        showToast('success', 'User account updated successfully!');
        setIsEditOpen(false);
        setEditingUser(null);
        fetchUsers();
      } else {
        showToast('error', json.message || 'Failed to update user.');
      }
    } catch {
      showToast('error', 'Network error. Check backend connection.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete the user "${name}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.status === 'success') {
        showToast('success', 'User account removed successfully!');
        fetchUsers();
      } else {
        showToast('error', json.message || 'Failed to delete user.');
      }
    } catch {
      showToast('error', 'Failed to connect to server.');
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
      {/* Toast Alert */}
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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Registered Users Directory
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">Manage user roles, credentials, and accounts across the platform</p>
        </div>
        <div className="flex gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-center px-4 border-r border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total</p>
            <p className="text-2xl font-black text-slate-900">{users.length}</p>
          </div>
          <div className="text-center px-4 border-r border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Executives</p>
            <p className="text-2xl font-black text-sky-600">{users.filter(u => u.role === 'executive').length}</p>
          </div>
          <div className="text-center px-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Customers</p>
            <p className="text-2xl font-black text-emerald-600">{users.filter(u => u.role === 'user').length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                    No registered users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-bold text-slate-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {user.email}
                      </div>
                      {user.phoneNumber && (
                        <div className="flex items-center gap-2 text-slate-600 mt-1 font-medium text-xs">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {user.phoneNumber}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
                          title="Edit User"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user._id, user.name)}
                          className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden" style={{ animation: 'zoomIn 0.2s ease' }}>
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex items-center justify-between">
              <h4 className="text-white font-bold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" />
                Edit User Credentials
              </h4>
              <button onClick={() => setIsEditOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  System Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                >
                  <option value="user">User / Customer</option>
                  <option value="executive">Executive / Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 py-2.5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
