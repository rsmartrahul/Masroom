'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Leaf, 
  Sun, 
  Users, 
  Package,
  Settings,
  HelpCircle
} from 'lucide-react';

export type AdminView = 'overview' | 'products' | 'enquiries' | 'cart-orders' | 'users' | 'mushroom' | 'solar';

interface SidebarProps {
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'overview' as AdminView, label: 'Overview', icon: LayoutDashboard },
    { id: 'enquiries' as AdminView, label: 'Enquiries', icon: HelpCircle },
    { id: 'cart-orders' as AdminView, label: 'Cart Activity', icon: Package },
    { id: 'products' as AdminView, label: 'Product Catalog', icon: Leaf },
    { id: 'users' as AdminView, label: 'User Management', icon: Users },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-100 flex flex-col h-full shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
          P
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none text-white tracking-wide">PRAVIN</h1>
          <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">ADMIN PORTAL</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        <p className="px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-3">Core Workspace</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/10' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Info */}
      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-300">Database Active</span>
          </div>
          <p className="text-[10px] text-slate-400">Connected to mongodb-live production cluster.</p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-slate-500 px-2">
          <span className="hover:text-slate-300 cursor-pointer flex items-center gap-1"><Settings className="w-3 h-3" /> Settings</span>
          <span className="hover:text-slate-300 cursor-pointer flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Help</span>
        </div>
      </div>
    </aside>
  );
}
