import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true
  },
  plugins: [react()],
  define: {
    'import.meta.vitest':"undefined",
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      reporter: ['html','text','lcov']
    }
  },
})
