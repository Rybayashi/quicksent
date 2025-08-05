import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/puesc': {
        target: 'https://test.puesc.gov.pl',
        changeOrigin: true,
        timeout: 10000, // 10 second timeout
        rewrite: (path) => path.replace(/^\/api\/puesc/, '/api'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            // Log specific timeout errors
            if ((err as any).code === 'ETIMEDOUT') {
              // Connection timed out - the server may be unavailable or your network connection is slow
            }
          });
          proxy.on('proxyRes', (_proxyRes, _req, _res) => {
            // Received Response from the Target
          });
        },
      },
      '/puesc': {
        target: 'https://test.puesc.gov.pl',
        changeOrigin: true,
        timeout: 10000, // 10 second timeout
        rewrite: (path) => path.replace(/^\/puesc/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            // Log specific timeout errors
            if ((err as any).code === 'ETIMEDOUT') {
              // Connection timed out - the server may be unavailable or your network connection is slow
            }
          });
          proxy.on('proxyRes', (_proxyRes, _req, _res) => {
            // Received Response from the Target
          });
        },
      }
    }
  }
})
