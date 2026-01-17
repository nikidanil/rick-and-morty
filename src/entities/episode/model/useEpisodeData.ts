import { useRickAndMortyData } from '@/shared/api/useRickAndMortyData';
import type { SortOrder } from '@/shared/types';
import type { Episode } from '../types';

export const useEpisodeData = (order: SortOrder) => {
	const { loading, error, data, hasMore, loadNext } = useRickAndMortyData<Episode>('episode', order);

	const sortedData = data
		? [...data].sort((a, b) => {
				const dateA = new Date(a.created).getTime();
				const dateB = new Date(b.created).getTime();
				return order === 'asc' ? dateA - dateB : dateB - dateA;
			})
		: [];

	return { loading, error, data: sortedData, hasMore, loadNext };
};
