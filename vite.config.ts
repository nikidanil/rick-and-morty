import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { pwaConfig } from './src/shared/config/pwa';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), VitePWA(pwaConfig)],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
