import type { VitePWAOptions } from 'vite-plugin-pwa';

export const pwaConfig: Partial<VitePWAOptions> = {
	registerType: 'autoUpdate',
	includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'offline.html'],

	manifest: {
		name: 'Рик и Морти — Мультивселенная',
		short_name: 'Рик и Морти',
		description: 'Приложение о персонажах, локациях и эпизодах вселенной Рика и Морти',
		theme_color: '#313233',
		background_color: '#242424',
		display: 'standalone',
		scope: '/',
		start_url: '/',
		icons: [
			{
				src: 'pwa-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: 'pwa-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: 'pwa-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any maskable',
			},
		],
	},

	devOptions: {
		enabled: true,
		type: 'module',
	},

	workbox: {
		globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp}'],
		navigateFallback: '/index.html',
		navigateFallbackDenylist: [/^\/api\//, /.*\.(?:png|jpe?g|gif|svg|webp|ico|css|js)$/i],
		runtimeCaching: [
			{
				urlPattern: /\/$/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'app-shell',
					networkTimeoutSeconds: 3,
					expiration: {
						maxEntries: 1,
						maxAgeSeconds: 24 * 60 * 60,
					},
					precacheFallback: {
						fallbackURL: '/offline.html',
					},
				},
			},
			{
				urlPattern: /^\/(?!api\/|assets\/|favicon\.ico|offline\.html).*$/i,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'app-shell',
					networkTimeoutSeconds: 3,
					expiration: {
						maxEntries: 5,
						maxAgeSeconds: 24 * 60 * 60,
					},
					precacheFallback: {
						fallbackURL: '/offline.html',
					},
				},
			},
			{
				urlPattern: /^https:\/\/rickandmortyapi\.com\/.*/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'api-cache',
					expiration: {
						maxEntries: 50,
						maxAgeSeconds: 60 * 60 * 24 * 7,
					},
				},
			},
			{
				urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif)$/i,
				handler: 'CacheFirst',
				options: {
					cacheName: 'image-cache',
					expiration: {
						maxEntries: 100,
						maxAgeSeconds: 60 * 60 * 24 * 30,
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
		],
	},
};
