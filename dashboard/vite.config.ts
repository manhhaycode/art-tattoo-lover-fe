import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
                    const modules = ['mantine', 'query', 'carousel', 'table'];
                    if (id.includes('map') || id.includes('google')) return;
                    if (!id.includes('node_modules')) return 'indexmin';
                    if (id.includes('node_modules')) {
                        for (const module of modules) {
                            if (id.includes(module)) return module;
                        }
                        return 'index';
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
