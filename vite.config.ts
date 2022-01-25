import { defineConfig } from 'vite'
const path = require('path');

function resolve(dir: string) {
  return path.join(__dirname, dir);
}

export default defineConfig({
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
    }
  }
})