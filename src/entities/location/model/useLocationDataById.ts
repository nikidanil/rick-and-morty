import { useDataById } from '@/shared/api/useDataById';
import type { Location } from '../types';

export const useLocationDataById = () => {
	const data = useDataById<Location>('location');

	return data;
};
