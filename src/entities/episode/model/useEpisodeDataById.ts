import { useDataById } from '@/shared/api/useDataById';
import type { Episode } from '../types';

export const useEpisodeDataById = () => {
	const data = useDataById<Episode>('episode');

	return data;
};
