/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// todo-at: no linting since moving from create react app. add eslint?
export default defineConfig({
    plugins: [react()],
    server: {
        // the backend CORS only allows this port
        port: 3000,
        strictPort: true,
    },
    build: {
        outDir: 'build',
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts',
    },
})
