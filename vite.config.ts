import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: './docs',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `long_island/assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'long_island/assets/[name]-[hash].js',
        entryFileNames: 'long_island/assets/[name]-[hash].js',
},
},
  }
})
