import React from 'react';
import { Shield, AlertTriangle, Activity, Database, Settings, LayoutDashboard, Search, Bell } from 'lucide-react';
import { cn } from '../utils/cn';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Bell, label: 'Incidents' },
  { icon: Activity, label: 'Monitoring' },
  { icon: Database, label: 'Threat Intel' },
  { icon: Search, label: 'Forensics' },
  { icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-soc-border flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-soc-accent rounded-lg flex items-center justify-center shadow-lg shadow-soc-accent/20">
          <Shield className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">SENTINEL</h1>
          <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">SOC Platform</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              item.active 
                ? "bg-soc-accent/10 text-soc-accent" 
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
            )}
          >
            <item.icon size={20} className={cn(item.active ? "text-soc-accent" : "text-zinc-500 group-hover:text-zinc-300")} />
            <span className="font-medium text-sm">{item.label}</span>
            {item.label === 'Incidents' && (
              <span className="ml-auto bg-soc-critical/20 text-soc-critical text-[10px] font-bold px-1.5 py-0.5 rounded">12</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-soc-border">
        <div className="bg-zinc-900/50 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">Saad Qamar</p>
            <p className="text-[10px] text-zinc-500 truncate">Senior Analyst</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
