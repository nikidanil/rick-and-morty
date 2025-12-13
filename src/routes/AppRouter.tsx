import { Route, Routes } from 'react-router-dom';
import { publicRoute } from '../constants';
import { MainLayout } from '../layouts';
import { PrivateRoute } from '../hoc';
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
} from '../pages';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path={publicRoute.home} element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path={publicRoute.login} element={<Login />} />

				<Route
					path={publicRoute.heroes}
					element={
						<PrivateRoute>
							<HeroesPage />
						</PrivateRoute>
					}
				/>
				<Route
					path={`${publicRoute.heroes}/:id`}
					element={
						<PrivateRoute>
							<HeroPage />
						</PrivateRoute>
					}
				/>

				<Route
					path={publicRoute.locations}
					element={
						<PrivateRoute>
							<LocationsPage />
						</PrivateRoute>
					}
				/>
				<Route
					path={`${publicRoute.locations}/:id`}
					element={
						<PrivateRoute>
							<LocationPage />
						</PrivateRoute>
					}
				/>

				<Route
					path={publicRoute.episodes}
					element={
						<PrivateRoute>
							<EpisodesPage />
						</PrivateRoute>
					}
				/>
				<Route
					path={`${publicRoute.episodes}/:id`}
					element={
						<PrivateRoute>
							<EpisodePage />
						</PrivateRoute>
					}
				/>

				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};
