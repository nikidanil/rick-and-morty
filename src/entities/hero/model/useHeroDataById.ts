import { useDataById } from '@/shared/api/useDataById';
import type { Hero } from '../types';

export const useHeroDataById = () => {
	const data = useDataById<Hero>('character');

	return data;
};
