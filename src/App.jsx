import React, { useState } from 'react';
import { Plus, Trash2, Settings, Scissors, FileDown, Calculator, Sparkles } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { calculateNesting } from './logic/nestingAlgo';
import { PDFReport } from './components/PDFReport';
import { VisualResult } from './components/VisualResult';

function App() {
  const [stockLength, setStockLength] = useState(6000);
  const [cutWidth, setCutWidth] = useState(3);
  const [cuts, setCuts] = useState([{ id: 1, length: 1200, quantity: 4 }]);
  const [results, setResults] = useState([]);
  const [isCalculated, setIsCalculated] = useState(false);

  // --- LÓGICA (Sin cambios) ---
  const addCut = () => setCuts([...cuts, { id: Date.now(), length: '', quantity: 1 }]);
  const removeCut = (id) => setCuts(cuts.filter(cut => cut.id !== id));
  const updateCut = (id, field, value) => setCuts(cuts.map(cut => cut.id === id ? { ...cut, [field]: value } : cut));
  const handleCalculate = () => {
    const calculatedBins = calculateNesting(stockLength, cutWidth, cuts);
    setResults(calculatedBins);
    setIsCalculated(true);
  };
  // ---------------------------

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      
      {/* --- HEADER MODERNIZADO --- */}
      <header className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold flex items-center gap-3 tracking-tight">
            {/* Icono con gradiente */}
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg shadow-indigo-500/30 text-white">
               <Scissors size={24} />
            </div>
            {/* Texto con efecto gradiente */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Nesting Pro
            </span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg font-medium flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-400" /> Optimización inteligente de cortes
          </p>
        </div>
        
        {/* Botón de Exportar Premium */}
        {isCalculated && results.length > 0 && (
          <PDFDownloadLink 
            document={<PDFReport results={results} stockLength={stockLength} />} 
            fileName={`nesting-${new Date().toISOString().slice(0,10)}.pdf`}
          >
            {({ loading }) => (
              <button disabled={loading} className="group bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95">
                <FileDown size={20} className="text-indigo-300 group-hover:text-white transition-colors" />
                <span className="font-semibold">{loading ? 'Generando...' : 'Descargar PDF'}</span>
              </button>
            )}
          </PDFDownloadLink>
        )}
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- COLUMNA IZQUIERDA (Inputs) --- */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Card Flotante: Configuración */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
                <Settings size={20} />
              </div>
              Configuración Base
            </h2>
            <div className="grid grid-cols-2 gap-5">
              {/* Inputs modernos sin bordes pesados */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Largo Barra (mm)</label>
                <input 
                  type="number" value={stockLength} onChange={(e) => setStockLength(e.target.value)}
                  className="w-full p-4 bg-white shadow-sm rounded-2xl ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono text-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Espesor Disco (mm)</label>
                <input 
                  type="number" value={cutWidth} onChange={(e) => setCutWidth(e.target.value)}
                  className="w-full p-4 bg-white shadow-sm rounded-2xl ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono text-lg"
                />
              </div>
            </div>
          </div>

          {/* Card Flotante: Lista de Cortes */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Cortes Requeridos</h2>
              <button onClick={addCut} className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 hover:scale-110 transition-all shadow-sm">
                <Plus size={20} strokeWidth={3} />
              </button>
            </div>
            
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {cuts.map((cut) => (
                <div key={cut.id} className="flex items-center gap-3 group">
                  <div className="relative flex-grow">
                    <input 
                      placeholder="Largo (mm)" type="number" value={cut.length}
                      onChange={(e) => updateCut(cut.id, 'length', e.target.value)}
                      className="w-full p-4 bg-white shadow-sm rounded-2xl ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all pl-10 font-mono" 
                    />
                    <span className="absolute left-3 top-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors">📏</span>
                  </div>
                  
                  <div className="w-24 relative">
                    <input 
                      placeholder="Cant." type="number" value={cut.quantity}
                      onChange={(e) => updateCut(cut.id, 'quantity', e.target.value)}
                      className="w-full p-4 bg-white shadow-sm rounded-2xl ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-center font-mono" 
                    />
                  </div>

                  <button onClick={() => removeCut(cut.id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-50 group-hover:opacity-100">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Botón Calcular Vibrante */}
            <button 
              onClick={handleCalculate}
              className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calculator size={20} className="animate-pulse" /> 
              <span className="tracking-wide">Calcular Optimización</span>
            </button>
          </div>
        </div>

        {/* --- COLUMNA DERECHA (Resultados) --- */}
        <div className="lg:col-span-7">
          <div className={`bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 min-h-[600px] transition-all ${isCalculated ? 'opacity-100 translate-y-0' : 'opacity-95 translate-y-2'}`}>
            {!isCalculated ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <div className="p-6 bg-slate-50 rounded-full animate-bounce-slow">
                    <Scissors size={40} strokeWidth={1.5} className="text-slate-300" />
                </div>
                <p className="text-lg font-medium">Tus resultados aparecerán aquí</p>
              </div>
            ) : (
              <>
                {/* Resumen Estadístico con Gradientes */}
                <div className="grid grid-cols-2 gap-5 mb-10">
                  <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl border border-indigo-100/50 relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-4 opacity-10">
                        <Scissors size={80} className="text-indigo-600"/>
                    </div>
                    <p className="text-sm text-indigo-600 uppercase font-bold tracking-wider mb-2">Barras a Comprar</p>
                    <p className="text-5xl font-extrabold text-slate-800">{results.length}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100/50 relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-4 opacity-10">
                        <Sparkles size={80} className="text-emerald-600"/>
                    </div>
                    <p className="text-sm text-emerald-600 uppercase font-bold tracking-wider mb-2">Total Cortes</p>
                    <p className="text-5xl font-extrabold text-slate-800">{results.reduce((acc, bin) => acc + bin.cuts.length, 0)}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    Plan de Corte Detallado
                </h3>
                {/* Aquí va el componente visual rediseñado */}
                <VisualResult results={results} />
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;