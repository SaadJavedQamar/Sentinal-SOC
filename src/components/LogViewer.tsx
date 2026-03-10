import React from 'react';
import { Terminal, Filter, Download } from 'lucide-react';

const mockLogs = [
  { time: '08:45:12', level: 'INFO', module: 'AUTH', msg: 'User admin logged in from 10.0.0.5' },
  { time: '08:45:15', level: 'WARN', module: 'FIREWALL', msg: 'Blocked connection from 185.22.14.1' },
  { time: '08:45:22', level: 'ERROR', module: 'DB', msg: 'Connection timeout on cluster-01' },
  { time: '08:45:30', level: 'INFO', module: 'SYSTEM', msg: 'Kernel update applied successfully' },
  { time: '08:45:45', level: 'DEBUG', module: 'API', msg: 'GET /v1/threats 200 OK' },
];

export function LogViewer() {
  return (
    <div className="glass-panel flex flex-col h-[300px]">
      <div className="p-4 border-b border-soc-border flex justify-between items-center bg-zinc-900/30">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
          <Terminal size={14} />
          System Audit Logs
        </h3>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-zinc-800 rounded transition-colors text-zinc-500">
            <Filter size={14} />
          </button>
          <button className="p-1.5 hover:bg-zinc-800 rounded transition-colors text-zinc-500">
            <Download size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] space-y-1 bg-black/20">
        {mockLogs.map((log, i) => (
          <div key={i} className="flex gap-4 group">
            <span className="text-zinc-600 shrink-0">{log.time}</span>
            <span className={
              log.level === 'ERROR' ? 'text-soc-critical' : 
              log.level === 'WARN' ? 'text-soc-high' : 
              log.level === 'INFO' ? 'text-soc-low' : 'text-zinc-500'
            }>{log.level}</span>
            <span className="text-soc-accent shrink-0">[{log.module}]</span>
            <span className="text-zinc-300 truncate">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
