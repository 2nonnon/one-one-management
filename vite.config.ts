import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3333
  },
  plugins: [
    vue(),
    eslintPlugin({
      cache: false
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
})
