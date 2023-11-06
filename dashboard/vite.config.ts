import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), manualChunksPlugin()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src'),
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            treeshake: {
                preset: 'recommended',
                manualPureFunctions: ['console.log'],
            },
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
                experimentalMinChunkSize: 10000,
                // assetFileNames() {
                //     return `assets/[hash].[ext]`;
                // },
            },
        },
    },
});
