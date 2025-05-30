import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Spendly',
        short_name: 'Spendly',
        description: 'Track your income and expenses effortlessly.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#72CD16', 
        icons: [
          {
            src: '/spendly.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/spendlylogo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
