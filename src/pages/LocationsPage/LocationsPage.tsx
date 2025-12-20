import { useCallback, useRef } from 'react';
import { LocationCard } from './components';
import { useRickAndMortyData, useSortParams } from '../../hooks';
import { SortPanel } from '../../components/SortPanel';

interface Location {
	id: number;
	name: string;
	type: string;
	dimension: string;
	created: string;
}

export const LocationsPage = () => {
	const { sortOrder, setSortOrder } = useSortParams();

	const { loading, error, data, hasMore, loadNext } = useRickAndMortyData<Location>('location', sortOrder);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastNodeRef = useCallback(
		(node: HTMLDivElement) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					loadNext();
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[hasMore, loadNext, loading]
	);

	const sortedLocations = [...data].sort((a, b) => {
		const dateA = new Date(a.created).getTime();
		const dateB = new Date(b.created).getTime();
		return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
	});

	return (
		<>
			<h1>Локации</h1>
			<SortPanel label='Сортировать по дате создания' sortOrder={sortOrder} setSortOrder={setSortOrder} />

			<div className='grid-content'>
				{sortedLocations.map((location, index) => {
					if (index === sortedLocations.length - 5) {
						return (
							<LocationCard ref={lastNodeRef} key={location.id} id={location.id} name={location.name} />
						);
					}

					return <LocationCard key={location.id} id={location.id} name={location.name} />;
				})}
				{loading && <p>Загрузка...</p>}
				{error && <p>Ошибка...</p>}
			</div>
		</>
	);
};
