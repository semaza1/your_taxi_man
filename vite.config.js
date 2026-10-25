import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-sanity': {
        target: 'https://xvnuzc0o.api.sanity.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-sanity/, ''),
      },
    },
  },
});