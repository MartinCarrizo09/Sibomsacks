import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true,
    proxy: {
      // En dev el frontend corre en :5173 y el backend en :3000.
      '/api': 'http://localhost:3000',
    },
  },
});
