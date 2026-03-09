import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // GitHub Pages serves this project under /RoomThreeJS/
  // Use '/' for local dev and '/RoomThreeJS/' for production builds.
  base: mode === 'production' ? '/RoomThreeJS/' : '/'
}));
