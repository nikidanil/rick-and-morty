import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';

type PrivateRouteProps = {
	children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const auth = useAuth();
	const location = useLocation();

	if (auth?.user === null) {
		return <Navigate to='/login' state={{ from: location.pathname }} replace />;
	}

	return children;
};
