import { useRickAndMortyData } from '@/shared/api/useRickAndMortyData';
import type { SortOrder } from '@/shared/types';
import type { Location } from '../types';

export const useLocationData = (order: SortOrder) => {
	const { loading, error, data, hasMore, loadNext } = useRickAndMortyData<Location>('location', order);

	const sortedData = data
		? [...data].sort((a, b) => {
				const dateA = new Date(a.created).getTime();
				const dateB = new Date(b.created).getTime();
				return order === 'asc' ? dateA - dateB : dateB - dateA;
			})
		: [];

	return { loading, error, data: sortedData, hasMore, loadNext };
};
