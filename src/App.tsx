import { Route, Routes } from 'react-router-dom';
import { MainLayout, PrivateRoute } from './components';
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
import { AuthProvider } from './context/AuthProvider';

export const App = () => {
	return (
		<AuthProvider>
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
		</AuthProvider>
	);
};
