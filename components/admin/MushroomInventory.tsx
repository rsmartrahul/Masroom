'use client';

import React, { useState } from 'react';
import { 
  Package, 
  RefreshCw, 
  Calendar, 
  Layers, 
  CheckCircle2, 
  Plus, 
  TrendingUp,
  Leaf
} from 'lucide-react';

export interface BatchItem {
  id: string;
  batchCode: string;
  strain: string;
  spawnDate: string;
  harvestDate: string | null;
  weightKg: number;
  status: 'Growing' | 'Harvested' | 'Packaged' | 'Shipped';
  qaPassed: boolean;
}

export interface SubscriptionItem {
  id: string;
  customerName: string;
  strain: string;
  frequency: 'Weekly' | 'Bi-Weekly' | 'Monthly';
  quantityGrams: number;
  nextDelivery: string;
  status: 'Active' | 'Paused';
}

interface InventoryProps {
  batches: BatchItem[];
  subscriptions: SubscriptionItem[];
  onAddBatch: (batch: Omit<BatchItem, 'id'>) => void;
  onToggleQA: (batchId: string) => void;
}

export default function MushroomInventory({ 
  batches, 
  subscriptions, 
  onAddBatch,
  onToggleQA 
}: InventoryProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBatch, setNewBatch] = useState({
    batchCode: 'SHR-2026-B05',
    strain: 'Oyster Shroom',
    spawnDate: '2026-06-01',
    weightKg: 25,
    status: 'Growing' as BatchItem['status'],
    qaPassed: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBatch({
      batchCode: newBatch.batchCode,
      strain: newBatch.strain,
      spawnDate: newBatch.spawnDate,
      harvestDate: newBatch.status === 'Harvested' ? new Date().toISOString().split('T')[0] : null,
      weightKg: Number(newBatch.weightKg),
      status: newBatch.status,
      qaPassed: newBatch.qaPassed
    });
    setShowAddForm(false);
    // increment default code
    setNewBatch(prev => ({
      ...prev,
      batchCode: `SHR-2026-B0${Number(prev.batchCode.split('-B0')[1]) + 1}`
    }));
  };

  return (
    <div className="space-y-8">
      {/* Pane 1: Crop Cultivation & Batch Traceability */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-500" />
              Cultivation Batches & E-Commerce Traceability
            </h3>
            <p className="text-xs text-slate-500 mt-1">Trace batches from spawn planting dates to packaging delivery.</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-md shadow-emerald-600/10"
          >
            <Plus className="w-4 h-4" />
            Add Crop Batch
          </button>
        </div>

        {/* Dynamic Add Batch Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Batch Reference Code</label>
              <input
                type="text"
                value={newBatch.batchCode}
                onChange={e => setNewBatch(prev => ({ ...prev, batchCode: e.target.value }))}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Mushroom Strain</label>
              <select
                value={newBatch.strain}
                onChange={e => setNewBatch(prev => ({ ...prev, strain: e.target.value }))}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
              >
                <option value="Button Mushroom">Button Mushroom</option>
                <option value="Oyster Shroom">Oyster Shroom</option>
                <option value="Dehydrated Shiitake">Dehydrated Shiitake</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Spawn Date</label>
              <input
                type="date"
                value={newBatch.spawnDate}
                onChange={e => setNewBatch(prev => ({ ...prev, spawnDate: e.target.value }))}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
                required
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Batch Weight (Kg)</label>
                <input
                  type="number"
                  value={newBatch.weightKg}
                  onChange={e => setNewBatch(prev => ({ ...prev, weightKg: Number(e.target.value) }))}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg h-9 transition-colors"
              >
                Confirm
              </button>
            </div>
          </form>
        )}

        {/* Cultivation Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch Code</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Strain Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Spawn Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Harvest status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Batch Weight</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">QA Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-1 rounded text-xs">
                      {batch.batchCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{batch.strain}</td>
                  <td className="px-6 py-4 text-slate-600 text-xs flex items-center gap-1.5 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(batch.spawnDate).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    {batch.status === 'Growing' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        Spawn Growing
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {batch.status} ({batch.harvestDate})
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-900">
                    {batch.weightKg} <span className="text-[10px] text-slate-500">kg</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => onToggleQA(batch.id)}
                        className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all ${
                          batch.qaPassed 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${batch.qaPassed ? 'text-emerald-600' : 'text-rose-600'}`} />
                        {batch.qaPassed ? 'QA Certified' : 'Hold / Inspect'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pane 2: Customer Recurring Subscriptions */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-indigo-500 animate-spin-slow" />
            Active Customer Mushroom Subscriptions
          </h3>
          <p className="text-xs text-slate-500 mt-1">Audit auto-delivery schedules and weight frequencies.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Strain Option</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Frequency</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Delivery Weight</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Next dispatch</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{sub.customerName}</td>
                  <td className="px-6 py-4 text-slate-800">{sub.strain}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
                      {sub.frequency}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-900">
                    {sub.quantityGrams} <span className="text-[10px] text-slate-500">g</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 font-medium">
                    {new Date(sub.nextDelivery).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
