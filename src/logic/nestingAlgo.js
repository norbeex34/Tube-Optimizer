export const calculateNesting = (stockLength, cutWidth, requestedCuts) => {
    // 1. Convertir todo a números y aplanar la lista
    // Si piden 3 cortes de 100, creamos [100, 100, 100]
    let allCuts = [];
    requestedCuts.forEach(c => {
      const length = Number(c.length);
      const qty = Number(c.quantity);
      if (length > 0 && qty > 0) {
        for (let i = 0; i < qty; i++) {
          allCuts.push(length);
        }
      }
    });
  
    // 2. Algoritmo First Fit Decreasing (Ordenamos de mayor a menor)
    allCuts.sort((a, b) => b - a);
    const kerf = Number(cutWidth);
    const stock = Number(stockLength);
  
    const bins = []; // Aquí guardamos las barras resultantes
  
    allCuts.forEach(cutLen => {
      // Validar si el corte es más largo que la barra misma
      if (cutLen > stock) {
        console.warn(`El corte de ${cutLen} es mayor al stock disponible.`);
        return; 
      }
  
      let placed = false;
      
      // Intentar meter el corte en una barra existente
      for (let bin of bins) {
        if (bin.freeSpace >= cutLen) {
          bin.cuts.push(cutLen);
          bin.freeSpace -= (cutLen + kerf); 
          placed = true;
          break;
        }
      }
  
      // Si no cabe, nueva barra
      if (!placed) {
        bins.push({
          id: bins.length + 1,
          totalLength: stock,
          freeSpace: stock - cutLen - kerf, // Restamos el corte y la sierra
          cuts: [cutLen]
        });
      }
    });
  
    return bins;
  };