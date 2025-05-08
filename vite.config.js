import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setupTests.js'],
    reporters: ['verbose'],
    outputFile: {
      ifNoTests: 'warn',
      ifFailed: 'error'
    },
    onConsoleLog(log, type) {
      console.log(`[${type}] ${log}`);
      return false;
    }
  }
})
