import { LocationList, useLocationData } from '@/entities/location';
import { SortPanel, useSortParams } from '@/features/sorting';

export const LocationsPage = () => {
	const { sortOrder, setSortOrder } = useSortParams();

	const { loading, error, data, hasMore, loadNext } = useLocationData(sortOrder);

	return (
		<>
			<h1>Локации</h1>
			<SortPanel label='Сортировать по дате создания' sortOrder={sortOrder} setSortOrder={setSortOrder} />

			<LocationList data={data} loading={loading} error={error} hasMore={hasMore} loadNext={loadNext} />
		</>
	);
};
