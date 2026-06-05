'use client';

import React from 'react';
import { 
  DollarSign, 
  RefreshCw, 
  Wrench, 
  ShieldAlert, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';

interface StatsProps {
  totalSales: number;
  activeSubscriptions: number;
  pendingCleanings: number;
  activeTechs: number;
}

export default function StatsGrid({ 
  totalSales, 
  activeSubscriptions, 
  pendingCleanings, 
  activeTechs 
}: StatsProps) {
  
  const stats = [
    {
      id: 'sales',
      label: 'Total Sales Revenue',
      value: `₹${totalSales.toLocaleString('en-IN')}`,
      trend: '+12.4% vs last month',
      icon: DollarSign,
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600',
      iconBg: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500'
    },
    {
      id: 'subs',
      label: 'Active Subscriptions',
      value: activeSubscriptions,
      trend: '+8 new recurring this week',
      icon: RefreshCw,
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-600',
      iconBg: 'bg-blue-100 dark:bg-blue-950/40 text-blue-500'
    },
    {
      id: 'cleanings',
      label: 'Pending Solar Washings',
      value: pendingCleanings,
      trend: '4 require tech assignment',
      icon: Wrench,
      color: 'from-orange-500/10 to-red-500/10 border-orange-500/20 text-orange-600',
      iconBg: 'bg-orange-100 dark:bg-orange-950/40 text-orange-500'
    },
    {
      id: 'techs',
      label: 'Dispatched Crew Field',
      value: activeTechs,
      trend: '100% currently deployed',
      icon: ArrowUpRight,
      color: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-600',
      iconBg: 'bg-purple-100 dark:bg-purple-950/40 text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div 
            key={stat.id}
            className={`bg-white border rounded-2xl p-6 transition-all hover:shadow-xl hover:translate-y-[-2px] flex flex-col justify-between shadow-sm relative overflow-hidden`}
          >
            {/* Subtle Gradient background matching card colors */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-30`} />

            <div className="relative z-10 flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">{stat.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-1.5 mt-2">
              <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">{stat.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
