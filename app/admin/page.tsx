'use client';

import React, { useState, useMemo } from 'react';
import Sidebar, { AdminView } from '../../components/admin/Sidebar';
import StatsGrid from '../../components/admin/StatsGrid';
import ServiceRequestsTable, { SolarRequest } from '../../components/admin/ServiceRequestsTable';
import MushroomInventory, { BatchItem, SubscriptionItem } from '../../components/admin/MushroomInventory';
import ProductManager from '../../components/admin/ProductManager';
import EnquiryManager from '../../components/admin/EnquiryManager';
import CartOrdersView from '../../components/admin/CartOrdersView';
import UserManager from '../../components/admin/UserManager';
import { 
  Users, 
  Settings, 
  Search, 
  LogOut, 
  Building2, 
  Bell, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState<AdminView>('overview');

  // 1. STATEFUL DUMMY DATA FOR SOLAR DISPATCHES
  const [requests, setRequests] = useState<SolarRequest[]>([
    {
      id: 'SB-101',
      customerName: 'Aditya Birla Chemicals',
      location: 'Plot 4, MIDC Industrial Area, Taloja',
      capacityKw: 45.0,
      assignedTech: 'Rahul Verma',
      status: 'Scheduled',
      scheduleDate: '2026-06-05'
    },
    {
      id: 'SB-102',
      customerName: 'Mehta Residential Villa',
      location: '104, Green Meadows, Sector 4, Pune',
      capacityKw: 5.5,
      assignedTech: 'Karan Johar',
      status: 'Completed',
      scheduleDate: '2026-06-01'
    },
    {
      id: 'SB-103',
      customerName: 'Ajmera Tech Park Array',
      location: 'Block C, Electronic City, Bengaluru',
      capacityKw: 120.0,
      assignedTech: 'Unassigned',
      status: 'Delayed',
      scheduleDate: '2026-05-28'
    },
    {
      id: 'SB-104',
      customerName: 'Singhania Penthouse rooftop',
      location: 'Kemp\'s Corner, South Mumbai',
      capacityKw: 8.0,
      assignedTech: 'Amit Patel',
      status: 'Scheduled',
      scheduleDate: '2026-06-10'
    }
  ]);

  const technicians = ['Rahul Verma', 'Karan Johar', 'Amit Patel', 'Devendra Singh'];

  // 2. STATEFUL DUMMY DATA FOR MUSHROOM SUPPLY CHAIN
  const [batches, setBatches] = useState<BatchItem[]>([
    {
      id: 'b1',
      batchCode: 'SHR-2026-B01',
      strain: 'Button Mushroom',
      spawnDate: '2026-04-10',
      harvestDate: '2026-05-20',
      weightKg: 450,
      status: 'Packaged',
      qaPassed: true
    },
    {
      id: 'b2',
      batchCode: 'SHR-2026-B02',
      strain: 'Oyster Shroom',
      spawnDate: '2026-05-01',
      harvestDate: null,
      weightKg: 280,
      status: 'Growing',
      qaPassed: true
    },
    {
      id: 'b3',
      batchCode: 'SHR-2026-B03',
      strain: 'Dehydrated Shiitake',
      spawnDate: '2026-04-15',
      harvestDate: '2026-05-25',
      weightKg: 120,
      status: 'Shipped',
      qaPassed: true
    },
    {
      id: 'b4',
      batchCode: 'SHR-2026-B04',
      strain: 'Oyster Shroom',
      spawnDate: '2026-05-12',
      harvestDate: null,
      weightKg: 310,
      status: 'Growing',
      qaPassed: false
    }
  ]);

  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([
    {
      id: 'sub-1',
      customerName: 'Taj Group of Hotels',
      strain: 'Fresh Oyster Mushrooms',
      frequency: 'Weekly',
      quantityGrams: 5000,
      nextDelivery: '2026-06-03',
      status: 'Active'
    },
    {
      id: 'sub-2',
      customerName: 'Organic Basket Retail',
      strain: 'Dehydrated Shiitake (200g Packs)',
      frequency: 'Bi-Weekly',
      quantityGrams: 10000,
      nextDelivery: '2026-06-10',
      status: 'Active'
    },
    {
      id: 'sub-3',
      customerName: 'Vikas Khanna Gourmet Kitchen',
      strain: 'Button Mushrooms (Fresh)',
      frequency: 'Weekly',
      quantityGrams: 3000,
      nextDelivery: '2026-06-04',
      status: 'Active'
    }
  ]);

  // 3. STATISTICAL AGGREGATES
  const [liveStats, setLiveStats] = useState({
    totalUsers: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    totalCartEvents: 0,
    checkoutEvents: 0,
  });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/stats`);
        const json = await res.json();
        if (json.status === 'success') {
          setLiveStats(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch admin stats');
      }
    };
    fetchStats();
  }, []);

  const stats = useMemo(() => {
    const totalSales = 124500; // Mock historical baseline
    const activeSubs = subscriptions.filter(s => s.status === 'Active').length;
    const pendingCleanings = requests.filter(r => r.status !== 'Completed').length;
    const activeTechs = technicians.length; // headcount

    return { totalSales, activeSubscriptions: activeSubs, pendingCleanings, activeTechs };
  }, [requests, subscriptions]);

  // ==========================================
  // STATEFUL DISPATCH MUTATIONS
  // ==========================================

  const handleAssignTech = (requestId: string, techName: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return { 
          ...req, 
          assignedTech: techName,
          status: techName === 'Unassigned' ? 'Delayed' : 'Scheduled'
        };
      }
      return req;
    }));
  };

  const handleUpdateStatus = (requestId: string, status: SolarRequest['status']) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status } : req
    ));
  };

  const handleAddBatch = (newBatch: Omit<BatchItem, 'id'>) => {
    setBatches(prev => [
      {
        ...newBatch,
        id: `b${prev.length + 1}`
      },
      ...prev
    ]);
  };

  const handleToggleQA = (batchId: string) => {
    setBatches(prev => prev.map(b => 
      b.id === batchId ? { ...b, qaPassed: !b.qaPassed } : b
    ));
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Administrative Screen Context */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-2 text-slate-500">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold text-slate-800">Pravin Enterprise Hub</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Session Info */}
            <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">Admin Supervisor</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Role: Global Overseer</p>
              </div>
            </div>

            {/* Date Widget */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>June 1, 2026</span>
            </div>

            {/* Bell Notifications */}
            <button className="relative w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
              <Bell className="w-4.5 h-4.5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content Scroller */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Section A: Welcome Heading & Metrics */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Administrative Control Dashboard</h2>
              <p className="text-sm text-slate-500 mt-1">Cross-vertical analytics for Mushroom E-Commerce & Solar Upkeep.</p>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              System Status: Fully Operational
            </div>
          </div>

          {/* Core Statistical Grid */}
          <StatsGrid 
            totalSales={stats.totalSales}
            activeSubscriptions={stats.activeSubscriptions}
            pendingCleanings={stats.pendingCleanings}
            activeTechs={stats.activeTechs}
          />

          {/* Section B: Contextual Workspaces (Tabs) */}
          <div className="space-y-6">
            
            {/* Overview View Summary: Both solar requests and mushroom batches */}
            {activeView === 'overview' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* 2-Column Table for Solar requests */}
                <div className="xl:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">☀️ Recent Solar Dispatch Tickets</h4>
                    <button 
                      onClick={() => setActiveView('solar')} 
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
                    >
                      View All dispatches &rarr;
                    </button>
                  </div>
                  <ServiceRequestsTable 
                    requests={requests}
                    technicians={technicians}
                    onAssignTech={handleAssignTech}
                    onUpdateStatus={handleUpdateStatus}
                  />
                </div>

                {/* 1-Column Batch Traceability Overview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">📦 Organic Crop Batches</h4>
                    <button 
                      onClick={() => setActiveView('mushroom')} 
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
                    >
                      Manage Batches &rarr;
                    </button>
                  </div>
                  
                  {/* Compact list */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                    {batches.map(batch => (
                      <div key={batch.id} className="flex items-center justify-between border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                        <div>
                          <p className="font-bold text-slate-950 text-sm">{batch.strain}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Code: {batch.batchCode}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          batch.status === 'Growing' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {batch.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mushroom Tab */}
            {activeView === 'mushroom' && (
              <MushroomInventory 
                batches={batches}
                subscriptions={subscriptions}
                onAddBatch={handleAddBatch}
                onToggleQA={handleToggleQA}
              />
            )}

            {/* Solar Tab */}
            {activeView === 'solar' && (
              <ServiceRequestsTable 
                requests={requests}
                technicians={technicians}
                onAssignTech={handleAssignTech}
                onUpdateStatus={handleUpdateStatus}
              />
            )}

            {/* Products Tab */}
            {activeView === 'products' && (
              <ProductManager />
            )}

            {/* Enquiries Tab */}
            {activeView === 'enquiries' && (
              <EnquiryManager />
            )}

            {/* Cart Orders Tab */}
            {activeView === 'cart-orders' && (
              <CartOrdersView />
            )}

            {/* User Management view */}
            {activeView === 'users' && (
              <UserManager />
            )}

          </div>

        </div>
      </main>
    </div>
  );
}
