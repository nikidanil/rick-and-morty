import { HeroList, useHeroData } from '@/entities/hero';
import { SortPanel, useSortParams } from '@/features/sorting';

export const HeroesPage = () => {
	const { sortOrder, setSortOrder } = useSortParams();

	const { loading, error, data, hasMore, loadNext } = useHeroData(sortOrder);

	return (
		<div>
			<h1>Персонажи</h1>
			<SortPanel label='Сортировать по дате создания' sortOrder={sortOrder} setSortOrder={setSortOrder} />

			<HeroList data={data} loading={loading} error={error} hasMore={hasMore} loadNext={loadNext} />
		</div>
	);
};
