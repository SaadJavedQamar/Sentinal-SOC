import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsGrid } from './components/StatsGrid';
import { AlertsTable } from './components/AlertsTable';
import { ThreatMap } from './components/ThreatMap';
import { AIAnalyzer } from './components/AIAnalyzer';
import { SecurityAlert } from './types';
import { Search, Bell, Shield, ChevronRight } from 'lucide-react';

import { LogViewer } from './components/LogViewer';

export default function App() {
  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(null);

  return (
    <div className="flex min-h-screen bg-soc-bg text-zinc-100 selection:bg-soc-accent/30">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-soc-border flex items-center justify-between px-8 bg-soc-bg/50 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-soc-accent transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search logs, IPs, or incidents..." 
                className="w-full bg-zinc-900/50 border border-soc-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-soc-accent/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-soc-low/10 border border-soc-low/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-soc-low animate-pulse" />
              <span className="text-[10px] font-bold text-soc-low uppercase tracking-wider">System Normal</span>
            </div>
            
            <button className="relative p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-soc-critical rounded-full border-2 border-soc-bg" />
            </button>
            
            <div className="h-8 w-[1px] bg-soc-border mx-2" />
            
            <button className="flex items-center gap-2 px-4 py-2 bg-soc-accent hover:bg-soc-accent/90 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-soc-accent/20">
              <Shield size={16} />
              New Incident
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <span>SOC</span>
            <ChevronRight size={12} />
            <span className="text-zinc-300">Dashboard</span>
            <ChevronRight size={12} />
            <span className="text-soc-accent">Overview</span>
          </div>

          <div className="flex flex-col gap-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Security Overview</h2>
                  <p className="text-sm text-zinc-500">Real-time threat monitoring and system health metrics.</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-zinc-900 border border-soc-border rounded-lg text-xs font-medium hover:bg-zinc-800 transition-colors">Last 24 Hours</button>
                  <button className="px-3 py-1.5 bg-zinc-900 border border-soc-border rounded-lg text-xs font-medium hover:bg-zinc-800 transition-colors">Export Report</button>
                </div>
              </div>
              <StatsGrid />
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <AlertsTable onSelectAlert={setSelectedAlert} />
                <LogViewer />
              </div>
              <div className="h-[500px] xl:h-auto">
                <ThreatMap />
              </div>
            </div>
          </div>
        </div>
      </main>

      <AIAnalyzer 
        alert={selectedAlert} 
        onClose={() => setSelectedAlert(null)} 
      />
    </div>
  );
}

