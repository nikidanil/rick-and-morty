import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './components';
import { publicRoute } from './constants';
import { EpisodePage, EpisodesPage, HeroesPage, HeroPage, HomePage, LocationPage, LocationsPage } from './pages';

export const App = () => {
	return (
		<Routes>
			<Route path={publicRoute.home} element={<MainLayout />}>
				<Route index element={<HomePage />} />

				<Route path={publicRoute.heroes} element={<HeroesPage />} />
				<Route path={`${publicRoute.heroes}/:id`} element={<HeroPage />} />

				<Route path={publicRoute.locations} element={<LocationsPage />} />
				<Route path={`${publicRoute.locations}/:id`} element={<LocationPage />} />

				<Route path={publicRoute.episodes} element={<EpisodesPage />} />
				<Route path={`${publicRoute.episodes}/:id`} element={<EpisodePage />} />
			</Route>
		</Routes>
	);
};
