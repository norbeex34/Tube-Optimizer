import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Esto arregla el error de "process is not defined" de react-pdf
    'process.env': {},
    // Esto ayuda a evitar problemas con variables globales
    global: 'window',
  },
  resolve: {
    alias: {
      // Estos alias evitan que Vite se confunda con librerías de Node
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util'
    }
  },
  // Optimizaciones para que el build no sea tan estricto con dependencias viejas
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
})