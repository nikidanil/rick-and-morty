export const publicRoute = {
	home: '/',
	login: '/login',
	heroes: '/heroes',
	hero: (id: string): string => `/heroes/${id}`,
	locations: '/locations',
	location: (id: string): string => `/locations/${id}`,
	episodes: '/episodes',
	episode: (id: string): string => `/episodes/${id}`,
};
