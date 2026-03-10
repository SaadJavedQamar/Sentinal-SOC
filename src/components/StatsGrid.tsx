import React from 'react';
import { ArrowUpRight, ArrowDownRight, ShieldAlert, Zap, Globe, Cpu } from 'lucide-react';
import { cn } from '../utils/cn';

const stats = [
  { label: 'Threats Blocked', value: '1,284', change: '+12%', trend: 'up', icon: ShieldAlert, color: 'text-soc-low' },
  { label: 'Active Alerts', value: '42', change: '-5%', trend: 'down', icon: Zap, color: 'text-soc-high' },
  { label: 'Global Traffic', value: '4.2 TB', change: '+18%', trend: 'up', icon: Globe, color: 'text-soc-accent' },
  { label: 'System Load', value: '24%', change: '-2%', trend: 'down', icon: Cpu, color: 'text-soc-medium' },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-panel p-5 group hover:border-soc-accent/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className={cn("p-2 rounded-lg bg-zinc-900", stat.color)}>
              <stat.icon size={20} />
            </div>
            <div className={cn(
              "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded",
              stat.trend === 'up' ? "bg-soc-low/10 text-soc-low" : "bg-soc-critical/10 text-soc-critical"
            )}>
              {stat.trend === 'up' ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
              {stat.change}
            </div>
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold font-mono tracking-tight">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
