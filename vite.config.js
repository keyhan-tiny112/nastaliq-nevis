import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

/**
 * آدرس سایت را فقط از یک جا (VITE_SITE_URL) می‌خواند و از آن می‌سازد:
 * canonical / og:url / JSON-LD در index.html، و فایل‌های robots.txt و sitemap.xml هنگام build.
 */
function seoFiles(siteUrl) {
  const lastmod = new Date().toISOString().slice(0, 10);
  return {
    name: 'seo-files',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`,
      });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || 'https://example.com').replace(/\/+$/, '');
  if (command === 'build' && !env.VITE_SITE_URL) {
    console.warn('\n⚠ VITE_SITE_URL تنظیم نشده؛ آدرس نمونهٔ example.com در canonical و sitemap قرار گرفت.\n  فایل .env.production بساز (نمونه: .env.example).\n');
  }

  return {
    // build: مسیرهای نسبی تا خروجی روی هر هاست استاتیکی کار کند؛ dev: ریشهٔ ساده
    base: command === 'build' ? './' : '/',
    plugins: [react(), seoFiles(siteUrl)],
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
  };
});