import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { PrivateRoute } from '../hoc';
import {
	LazyHomePage,
	LazyLogin,
	LazyHeroesPage,
	LazyHeroPage,
	LazyLocationsPage,
	LazyLocationPage,
	LazyEpisodesPage,
	LazyEpisodePage,
	LazyNotFoundPage,
} from '../pages/lazyPages';

import { publicRoute } from '../constants';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path={publicRoute.home} element={<MainLayout />}>
				<Route index element={<LazyHomePage />} />
				<Route path={publicRoute.login} element={<LazyLogin />} />

				<Route
					path={publicRoute.heroes}
					element={
						<PrivateRoute>
							<LazyHeroesPage />
						</PrivateRoute>
					}
				/>
				<Route
					path={`${publicRoute.heroes}/:id`}
					element={
						<PrivateRoute>
							<LazyHeroPage />
						</PrivateRoute>
					}
				/>

				<Route
					path={publicRoute.locations}
					element={
						<PrivateRoute>
							<LazyLocationsPage />
						</PrivateRoute>
					}
				/>
				<Route
					path={`${publicRoute.locations}/:id`}
					element={
						<PrivateRoute>
							<LazyLocationPage />
						</PrivateRoute>
					}
				/>

				<Route
					path={publicRoute.episodes}
					element={
						<PrivateRoute>
							<LazyEpisodesPage />
						</PrivateRoute>
					}
				/>
				<Route
					path={`${publicRoute.episodes}/:id`}
					element={
						<PrivateRoute>
							<LazyEpisodePage />
						</PrivateRoute>
					}
				/>

				<Route path='*' element={<LazyNotFoundPage />} />
			</Route>
		</Routes>
	);
};
