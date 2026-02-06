import React from 'react';

export const VisualResult = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <div className="space-y-6">
      {results.map((bin) => {
        const usage = ((bin.totalLength - bin.freeSpace) / bin.totalLength) * 100;
        
        return (
          <div key={bin.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between text-xs mb-2 font-medium text-slate-600">
              <span>Barra #{bin.id}</span>
              <span>
                Uso: <span className={usage > 90 ? "text-green-600" : "text-blue-600"}>{usage.toFixed(1)}%</span>
              </span>
            </div>
            
            <div className="w-full h-12 bg-slate-200 rounded-lg flex overflow-hidden border border-slate-300 relative">
              {bin.cuts.map((cut, idx) => (
                <div 
                  key={idx}
                  className="h-full bg-blue-500 border-r border-blue-400 flex items-center justify-center text-[10px] text-white font-bold shadow-inner"
                  style={{ width: `${(cut / bin.totalLength) * 100}%` }}
                  title={`${cut}mm`}
                >
                  {cut}
                </div>
              ))}
              {/* Representación del espacio libre */}
              <div className="flex-grow h-full bg-slate-200 flex items-center justify-center">
                 {bin.freeSpace > 50 && (
                   <span className="text-[10px] text-slate-400 font-medium">{bin.freeSpace}mm libres</span>
                 )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};