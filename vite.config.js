import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path used by GitHub Pages: https://riadh-bakhti.github.io/taskflow-app/
export default defineConfig({
  plugins: [react()],
  base: '/taskflow-app/',
});
