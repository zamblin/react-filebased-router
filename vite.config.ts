// Example of use
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import { resolve } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = resolve(__filename, '..');

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//   },
//   build: {
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, 'index.html'),
//       },
//       output: {
//         format: 'es',
//       },
//     },
//   },
//   base: '/',
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'react-markdown-render',
      fileName: () => `index.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
