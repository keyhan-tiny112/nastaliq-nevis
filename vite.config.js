import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ command }) => ({
  // build: مسیرهای نسبی تا خروجی روی هر هاست استاتیکی کار کند؛ dev: ریشهٔ ساده
  base: command === 'build' ? './' : '/',
  plugins: [react()],
  server: {
    host: '127.0.0.1', // جلوگیری از اختلاف IPv4/IPv6 با برنامه‌های دیگری که روی localhost هستند
    port: 5173,
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          metal: ['metal-fx'],
        },
      },
    },
  },
}));
