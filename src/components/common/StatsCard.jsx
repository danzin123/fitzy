import React from 'react';

const StatsCard = ({ label, value, trend, chartData = [] }) => {
  return (
    <div className="bg-[#121212] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between hover:border-[#8eff71]/50 transition-colors">
      <div>
        <p className="text-gray-400 text-sm font-semibold tracking-wider mb-1">{label}</p>
        <h3 className="text-4xl font-black text-white tracking-tighter">{value}</h3>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        {trend && (
          <span className="text-[#8eff71] text-xs font-bold bg-[#8eff71]/10 px-3 py-1 rounded-full">
            {trend}
          </span>
        )}
        
        {/* Renderiza as barrinhas do gráfico apenas se houver dados de verdade */}
        {chartData && chartData.length > 0 && (
          <div className="flex items-end gap-1 h-8">
            {chartData.map((bar, index) => (
              <div 
                key={index}
                className="w-1.5 bg-[#8eff71] rounded-t-sm opacity-80"
                style={{ height: `${bar}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;