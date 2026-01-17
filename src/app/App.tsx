import { AuthProvider } from '@/features/auth/model/AuthProvider';
import { AppRouter } from './router/AppRouter';

export const App = () => {
	return (
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	);
};
