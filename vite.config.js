import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      SharedComponents: fileURLToPath(
        new URL('./src/components/SharedComponents', import.meta.url),
      ),
      localData: fileURLToPath(
        new URL('./src/utils/localData', import.meta.url),
      ),
      Icons: fileURLToPath(
        new URL('./src/assets/icons', import.meta.url),
      ),
    },
  },
  build: {
    rolldownOptions: {
      input: fileURLToPath(new URL('./index.html', import.meta.url)),
    },
  },
})
