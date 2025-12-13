import { AuthProvider } from './context/AuthProvider';
import { AppRouter } from './routes';

export const App = () => {
	return (
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	);
};
