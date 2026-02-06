import React, { useState } from 'react';
import { Plus, Trash2, Box, Scissors, FileDown, Calculator } from 'lucide-react';
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

  const addCut = () => {
    setCuts([...cuts, { id: Date.now(), length: '', quantity: 1 }]);
  };

  const removeCut = (id) => {
    setCuts(cuts.filter(cut => cut.id !== id));
  };

  const updateCut = (id, field, value) => {
    setCuts(cuts.map(cut => cut.id === id ? { ...cut, [field]: value } : cut));
  };

  const handleCalculate = () => {
    const calculatedBins = calculateNesting(stockLength, cutWidth, cuts);
    setResults(calculatedBins);
    setIsCalculated(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-800">
      
      {/* --- HEADER --- */}
      <header className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Scissors className="text-blue-600" /> Nesting Pro
          </h1>
          <p className="text-slate-500 text-sm mt-1">Calculadora de cortes para caños y perfiles</p>
        </div>
        
        {/* Botón de Exportar (Solo visible si hay resultados) */}
        {isCalculated && results.length > 0 && (
          <PDFDownloadLink 
            document={<PDFReport results={results} stockLength={stockLength} />} 
            fileName={`nesting-${new Date().toISOString().slice(0,10)}.pdf`}
          >
            {({ loading }) => (
              <button disabled={loading} className="bg-slate-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-slate-700 transition shadow-lg shadow-slate-300/50">
                <FileDown size={18} />
                {loading ? 'Generando...' : 'Descargar PDF'}
              </button>
            )}
          </PDFDownloadLink>
        )}
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- COLUMNA IZQUIERDA: CONFIGURACIÓN --- */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Material Base */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700">
              <Box size={20} className="text-blue-500" /> Configuración Material
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Largo Barra (mm)</label>
                <input 
                  type="number" 
                  value={stockLength}
                  onChange={(e) => setStockLength(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Espesor Disco (mm)</label>
                <input 
                  type="number" 
                  value={cutWidth}
                  onChange={(e) => setCutWidth(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Card: Lista de Cortes */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-700">Lista de Cortes</h2>
              <button onClick={addCut} className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition">
                <Plus size={20} />
              </button>
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cuts.map((cut) => (
                <div key={cut.id} className="flex items-center gap-2">
                  <div className="relative flex-grow">
                    <input 
                      placeholder="Largo (mm)" 
                      type="number" 
                      value={cut.length}
                      onChange={(e) => updateCut(cut.id, 'length', e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-400 pl-8" 
                    />
                    <span className="absolute left-3 top-3.5 text-slate-400 text-xs">📏</span>
                  </div>
                  
                  <div className="w-24 relative">
                    <input 
                      placeholder="Cant." 
                      type="number" 
                      value={cut.quantity}
                      onChange={(e) => updateCut(cut.id, 'quantity', e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-400 text-center" 
                    />
                  </div>

                  <button onClick={() => removeCut(cut.id)} className="p-3 text-slate-400 hover:text-red-500 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={handleCalculate}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-200"
            >
              <Calculator size={20} /> Calcular Optimización
            </button>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: RESULTADOS --- */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[600px]">
            {!isCalculated ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                <Box size={64} strokeWidth={1} className="mb-4" />
                <p>Ingresa los cortes y presiona calcular</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-xs text-blue-600 uppercase font-bold tracking-wider">Barras Totales</p>
                    <p className="text-3xl font-bold text-slate-800">{results.length}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="text-xs text-green-600 uppercase font-bold tracking-wider">Cortes Totales</p>
                    <p className="text-3xl font-bold text-slate-800">{results.reduce((acc, bin) => acc + bin.cuts.length, 0)}</p>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Visualización de Cortes</h3>
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