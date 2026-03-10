import React, { useState, useEffect } from 'react';
import { SecurityAlert } from '../types';
import { analyzeAlert } from '../services/gemini';
import Markdown from 'react-markdown';
import { BrainCircuit, X, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

interface AIAnalyzerProps {
  alert: SecurityAlert | null;
  onClose: () => void;
}

export function AIAnalyzer({ alert, onClose }: AIAnalyzerProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (alert) {
      handleAnalyze();
    } else {
      setAnalysis(null);
    }
  }, [alert]);

  const handleAnalyze = async () => {
    if (!alert) return;
    setLoading(true);
    try {
      const result = await analyzeAlert(alert);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      setAnalysis("Failed to analyze alert. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  if (!alert) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[450px] bg-soc-bg border-l border-soc-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-soc-border flex justify-between items-center bg-soc-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-soc-accent/20 rounded-xl flex items-center justify-center">
            <BrainCircuit className="text-soc-accent" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg">AI Threat Analysis</h2>
            <p className="text-xs text-zinc-500 font-mono">{alert.id}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="glass-panel p-4 border-l-4 border-l-soc-accent">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Incident Context</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase">Type</p>
              <p className="text-sm font-medium">{alert.type}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase">Severity</p>
              <p className={cn(
                "text-sm font-bold",
                alert.severity === 'CRITICAL' ? 'text-soc-critical' : 'text-soc-high'
              )}>{alert.severity}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-zinc-500 uppercase">Source</p>
              <p className="text-sm font-mono">{alert.source}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <ShieldCheck size={18} className="text-soc-low" />
              Gemini Insights
            </h3>
            {loading && <Loader2 size={16} className="animate-spin text-soc-accent" />}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
              <Loader2 size={32} className="animate-spin mb-4 opacity-50" />
              <p className="text-sm font-medium animate-pulse">Analyzing threat patterns...</p>
              <p className="text-xs opacity-50 mt-1">Cross-referencing with global threat intel</p>
            </div>
          ) : analysis ? (
            <div className="prose prose-invert prose-sm max-w-none bg-zinc-900/50 rounded-xl p-5 border border-soc-border">
              <Markdown>{analysis}</Markdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500 border border-dashed border-soc-border rounded-xl">
              <AlertCircle size={32} className="mb-4 opacity-20" />
              <p className="text-sm">No analysis generated</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border-t border-soc-border bg-soc-card">
        <button 
          className="w-full bg-soc-accent hover:bg-soc-accent/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-soc-accent/20 flex items-center justify-center gap-2"
          onClick={() => alert.status = 'IN_PROGRESS' as any}
        >
          Initiate Remediation Workflow
        </button>
      </div>
    </div>
  );
}
