import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: './',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            }
        }
    },
    server: {
        port: 3000,
        host: true
    },
    resolve: {
        alias: {
            // Ensure proper resolution of @arcgis/core
            '@arcgis/core': resolve(__dirname, 'node_modules/@arcgis/core')
        }
    },
    optimizeDeps: {
        include: ['@arcgis/core']
    }
});