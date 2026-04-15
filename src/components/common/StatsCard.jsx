import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ label, value, trend, delta, icon: Icon, chartData }) {
  const isPositive = trend === 'up';
  
  // SVG Sparkline logic
  const max = Math.max(...chartData);
  const min = Math.min(...chartData);
  const range = max - min;
  const points = chartData.map((val, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-surface-low border border-border-ghost rounded-xl p-6">
      <div className="text-[0.75rem] uppercase tracking-[0.05em] text-text-muted mb-2">
        {label}
      </div>
      <div className="text-[2rem] font-bold text-text-primary mb-1">
        {value}
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-primary' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {delta}
      </div>
      
      {chartData && (
        <svg className="mt-4 h-10 w-full stroke-primary fill-none stroke-2" viewBox="0 0 100 40" preserveAspectRatio="none">
          <polyline points={points} />
        </svg>
      )}
    </div>
  );
}
