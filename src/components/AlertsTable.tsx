import React from 'react';
import { Severity, AlertStatus, SecurityAlert } from '../types';
import { cn } from '../utils/cn';
import { MoreHorizontal, ExternalLink, ShieldAlert } from 'lucide-react';

const mockAlerts: SecurityAlert[] = [
  {
    id: 'AL-9283',
    timestamp: '2026-03-10 08:12:45',
    source: '192.168.1.45',
    type: 'Brute Force Attempt',
    severity: Severity.CRITICAL,
    status: AlertStatus.OPEN,
    description: 'Multiple failed SSH login attempts detected from external IP.'
  },
  {
    id: 'AL-9284',
    timestamp: '2026-03-10 08:15:12',
    source: 'AWS-US-EAST-1',
    type: 'DDoS Mitigation',
    severity: Severity.HIGH,
    status: AlertStatus.IN_PROGRESS,
    description: 'Traffic spike detected on edge gateway. Mitigation active.'
  },
  {
    id: 'AL-9285',
    timestamp: '2026-03-10 08:20:01',
    source: 'Endpoint-X2',
    type: 'Malware Detected',
    severity: Severity.HIGH,
    status: AlertStatus.OPEN,
    description: 'Heuristic analysis flagged suspicious binary execution.'
  },
  {
    id: 'AL-9286',
    timestamp: '2026-03-10 08:22:30',
    source: 'Internal-DB-01',
    type: 'SQL Injection',
    severity: Severity.MEDIUM,
    status: AlertStatus.RESOLVED,
    description: 'Sanitization layer blocked malicious query pattern.'
  }
];

const severityColors = {
  [Severity.CRITICAL]: 'bg-soc-critical/20 text-soc-critical border-soc-critical/30',
  [Severity.HIGH]: 'bg-soc-high/20 text-soc-high border-soc-high/30',
  [Severity.MEDIUM]: 'bg-soc-medium/20 text-soc-medium border-soc-medium/30',
  [Severity.LOW]: 'bg-soc-low/20 text-soc-low border-soc-low/30',
};

interface AlertsTableProps {
  onSelectAlert: (alert: SecurityAlert) => void;
}

export function AlertsTable({ onSelectAlert }: AlertsTableProps) {
  return (
    <div className="glass-panel overflow-hidden">
      <div className="p-4 border-b border-soc-border flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <ShieldAlert size={18} className="text-soc-accent" />
          Recent Security Incidents
        </h3>
        <button className="text-xs text-soc-accent hover:underline flex items-center gap-1">
          View All <ExternalLink size={12} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-zinc-500 border-b border-soc-border bg-zinc-900/30">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Timestamp</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Severity</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soc-border/50">
            {mockAlerts.map((alert) => (
              <tr 
                key={alert.id} 
                className="hover:bg-zinc-800/30 transition-colors cursor-pointer group"
                onClick={() => onSelectAlert(alert)}
              >
                <td className="px-4 py-4 font-mono text-xs text-zinc-400">{alert.id}</td>
                <td className="px-4 py-4 text-xs">{alert.timestamp}</td>
                <td className="px-4 py-4 font-medium">{alert.type}</td>
                <td className="px-4 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider",
                    severityColors[alert.severity]
                  )}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-4 py-4 font-mono text-xs">{alert.source}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      alert.status === AlertStatus.OPEN ? "bg-soc-critical animate-pulse" : 
                      alert.status === AlertStatus.IN_PROGRESS ? "bg-soc-medium" : "bg-soc-low"
                    )} />
                    <span className="text-xs capitalize">{alert.status.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="p-1 hover:bg-zinc-700 rounded transition-colors">
                    <MoreHorizontal size={16} className="text-zinc-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
