import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/Test/navbar.test.tsx'],
    globals: true,
    coverage: {
      reporter: ['test', 'html'],
      reportsDirectory: './coverage'
    }
  }
})

