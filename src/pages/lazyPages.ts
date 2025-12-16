import { lazy } from 'react';

export const LazyHomePage = lazy(() =>
	import('./HomePage').then((module) => ({
		default: module.HomePage,
	}))
);

export const LazyLogin = lazy(() =>
	import('./Login').then((module) => ({
		default: module.Login,
	}))
);

export const LazyHeroesPage = lazy(() =>
	import('./HeroesPage').then((module) => ({
		default: module.HeroesPage,
	}))
);

export const LazyHeroPage = lazy(() =>
	import('./HeroPage').then((module) => ({
		default: module.HeroPage,
	}))
);

export const LazyLocationsPage = lazy(() =>
	import('./LocationsPage').then((module) => ({
		default: module.LocationsPage,
	}))
);

export const LazyLocationPage = lazy(() =>
	import('./LocationPage').then((module) => ({
		default: module.LocationPage,
	}))
);

export const LazyEpisodesPage = lazy(() =>
	import('./EpisodesPage').then((module) => ({
		default: module.EpisodesPage,
	}))
);

export const LazyEpisodePage = lazy(() =>
	import('./EpisodePage').then((module) => ({
		default: module.EpisodePage,
	}))
);

export const LazyNotFoundPage = lazy(() =>
	import('./NotFoundPage').then((module) => ({
		default: module.NotFoundPage,
	}))
);
