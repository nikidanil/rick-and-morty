import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './components';
import { publicRoute } from './constants';
import {
	EpisodePage,
	EpisodesPage,
	HeroesPage,
	HeroPage,
	HomePage,
	LocationPage,
	LocationsPage,
	Login,
	NotFoundPage,
} from './pages';

export const App = () => {
	return (
		<Routes>
			<Route path={publicRoute.home} element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path={publicRoute.login} element={<Login />} />

				<Route path={publicRoute.heroes} element={<HeroesPage />} />
				<Route path={`${publicRoute.heroes}/:id`} element={<HeroPage />} />

				<Route path={publicRoute.locations} element={<LocationsPage />} />
				<Route path={`${publicRoute.locations}/:id`} element={<LocationPage />} />

				<Route path={publicRoute.episodes} element={<EpisodesPage />} />
				<Route path={`${publicRoute.episodes}/:id`} element={<EpisodePage />} />

				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};
