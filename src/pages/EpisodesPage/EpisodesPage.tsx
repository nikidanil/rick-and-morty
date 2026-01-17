import { EpisodeList, useEpisodeData } from '@/entities/episode';
import { SortPanel, useSortParams } from '@/features/sorting';

export const EpisodesPage = () => {
	const { sortOrder, setSortOrder } = useSortParams();

	const { loading, error, data, hasMore, loadNext } = useEpisodeData(sortOrder);

	return (
		<div>
			<h1>Серии</h1>
			<SortPanel label='Сортировать по дате создания' sortOrder={sortOrder} setSortOrder={setSortOrder} />

			<EpisodeList data={data} loading={loading} error={error} hasMore={hasMore} loadNext={loadNext} />
		</div>
	);
};
