// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Změň na finální doménu, než budeme deployovat na Wedos.
  // Používá se pro sitemap.xml, canonical URL a OG tagy.
  site: 'https://scandy.cz',

  // Wedos WebSite = klasický statický hosting přes FTP.
  output: 'static',

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    // 'directory' = /o-nas/index.html → URL bez .html na konci.
    // Na Apache u Wedosu funguje out of the box.
    format: 'directory',
  },
});
