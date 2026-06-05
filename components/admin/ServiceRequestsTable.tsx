'use client';

import React, { useState } from 'react';
import { Search, UserCheck, Calendar, Filter, MapPin } from 'lucide-react';

export interface SolarRequest {
  id: string;
  customerName: string;
  location: string;
  capacityKw: number;
  assignedTech: string;
  status: 'Completed' | 'Scheduled' | 'Delayed';
  scheduleDate: string;
}

interface TableProps {
  requests: SolarRequest[];
  technicians: string[];
  onAssignTech: (requestId: string, techName: string) => void;
  onUpdateStatus: (requestId: string, status: SolarRequest['status']) => void;
}

export default function ServiceRequestsTable({ 
  requests, 
  technicians, 
  onAssignTech,
  onUpdateStatus 
}: TableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | SolarRequest['status']>('all');

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'all' ? true : req.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: SolarRequest['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Completed
          </span>
        );
      case 'Scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Scheduled
          </span>
        );
      case 'Delayed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Delayed
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Filtering Header */}
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Solar Panel Washing dispatches</h3>
          <p className="text-xs text-slate-500 mt-1">Assign field engineers and audit cleaning status.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customer or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-56"
            />
          </div>

          {/* Status filtering pills */}
          <div className="flex border border-slate-300 rounded-xl overflow-hidden text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-2 font-medium ${statusFilter === 'all' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('Scheduled')}
              className={`px-3 py-2 font-medium border-l border-slate-200 ${statusFilter === 'Scheduled' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
            >
              Scheduled
            </button>
            <button
              onClick={() => setStatusFilter('Completed')}
              className={`px-3 py-2 font-medium border-l border-slate-200 ${statusFilter === 'Completed' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setStatusFilter('Delayed')}
              className={`px-3 py-2 font-medium border-l border-slate-200 ${statusFilter === 'Delayed' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
            >
              Delayed
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Info</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location / Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Solar Capacity</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Field Technician Assignment</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dispatch Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  No service requests found matching your search.
                </td>
              </tr>
            ) : (
              filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Customer column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-800 text-xs">
                        {req.customerName.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{req.customerName}</p>
                        <p className="text-[11px] text-slate-500">ID: {req.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Location Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-800 flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        {req.location}
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                        {new Date(req.scheduleDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </td>

                  {/* Capacity Column */}
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-slate-900 text-base">{req.capacityKw}</span>
                    <span className="text-[11px] text-slate-500 ml-1">kW</span>
                  </td>

                  {/* Technician Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-slate-400" />
                      <select
                        value={req.assignedTech}
                        onChange={(e) => onAssignTech(req.id, e.target.value)}
                        className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="Unassigned">⚠️ Select Crew...</option>
                        {technicians.map((tech) => (
                          <option key={tech} value={tech}>
                            {tech}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4">{getStatusBadge(req.status)}</td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => onUpdateStatus(req.id, 'Completed')}
                        className="text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-200 text-slate-700 font-bold px-2 py-1 rounded transition-all"
                      >
                        Approve Done
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(req.id, 'Delayed')}
                        className="text-[11px] bg-slate-100 hover:bg-amber-50 hover:text-amber-700 border border-transparent hover:border-amber-200 text-slate-700 font-bold px-2 py-1 rounded transition-all"
                      >
                        Flag Delay
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
  );
}
