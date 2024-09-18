import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        format: 'es',
      },
    },
  },
  base: '/',
});

/*
<script>
      (function () {
        const segment = 1;
        const l = window.location;
        if (l.hash) {
          if (l.search) {
            l.search += '&' + l.hash.slice(1);
          } else {
            l.search = '?' + l.hash.slice(1);
          }
          l.hash = '';
          window.history.replaceState(
            null,
            null,
            l.pathname + l.search + l.hash
          );
        }
      })();
    </script>
    */
