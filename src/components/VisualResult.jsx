import React from 'react';

export const VisualResult = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {results.map((bin, index) => {
        const usage = ((bin.totalLength - bin.freeSpace) / bin.totalLength) * 100;
        const isHighlyEfficient = usage > 90;
        
        return (
          <div key={bin.id} className="relative group">
            {/* Etiqueta de Barra */}
            <div className="flex justify-between items-end mb-3 px-1">
              <span className="text-lg font-bold text-slate-700 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-xs">#{index + 1}</span>
                Barra de {bin.totalLength}mm
              </span>
              <div className="text-right">
                 <span className={`text-sm font-bold py-1 px-3 rounded-full ${isHighlyEfficient ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"}`}>
                    {usage.toFixed(1)}% Uso
                 </span>
              </div>
            </div>
            
            {/* Contenedor de la Barra Visual (Efecto 3D Sutil) */}
            <div className="w-full h-16 bg-slate-100 rounded-2xl flex overflow-hidden relative shadow-inner border border-slate-200/80">
              
              {/* Los Cortes (Efecto Metálico Vibrante) */}
              {bin.cuts.map((cut, idx) => (
                <div 
                  key={idx}
                  // Usamos un gradiente para dar volumen y un borde derecho blanco para simular el corte de sierra
                  className="h-full bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-700 border-r-2 border-white/30 flex items-center justify-center relative group/cut hover:brightness-110 transition-all"
                  style={{ width: `${(cut / bin.totalLength) * 100}%` }}
                >
                  {/* Texto del corte con sombra para legibilidad */}
                  <span className="text-xs md:text-sm text-white font-bold drop-shadow-md z-10 truncate px-1">
                    {cut}
                  </span>
                  {/* Brillo superior para efecto cristal */}
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
                </div>
              ))}

              {/* Espacio Libre (Textura de "vacío") */}
              <div className="flex-grow h-full bg-slate-100/50 flex items-center justify-center relative" 
                   style={{backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '8px 8px'}}>
                 {bin.freeSpace > 0 && (
                   <span className="text-xs font-medium text-slate-400 bg-slate-100/80 px-2 py-1 rounded-md shadow-sm truncate">
                     {bin.freeSpace}mm sobrante
                   </span>
                 )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};