import { use } from 'react';
import { AuthContext } from '../../context/authContext';

export const useAuth = () => {
	return use(AuthContext);
};
