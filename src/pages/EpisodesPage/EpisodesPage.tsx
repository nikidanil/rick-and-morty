import { EpisodeCard } from './components';
import { useRickAndMortyData, useSortParams } from '../../hooks';
import { SortPanel } from '../../components/SortPanel';
import { useCallback, useRef } from 'react';

interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	created: string;
}

export const EpisodesPage = () => {
	const { sortOrder, setSortOrder } = useSortParams();

	const { loading, error, data, hasMore, loadNext } = useRickAndMortyData<Episode>('episode', sortOrder);

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

	const sortedEpisodes = [...data].sort((a, b) => {
		const dateA = new Date(a.created).getTime();
		const dateB = new Date(b.created).getTime();
		return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
	});

	return (
		<div>
			<h1>Серии</h1>
			<SortPanel label='Сортировать по дате создания' sortOrder={sortOrder} setSortOrder={setSortOrder} />

			<div className='grid-content'>
				{sortedEpisodes.map((episode, index) => {
					if (index === sortedEpisodes.length - 5) {
						return (
							<EpisodeCard ref={lastNodeRef} key={episode.id} id={episode.id} episode={episode.episode} />
						);
					}

					return <EpisodeCard key={episode.id} id={episode.id} episode={episode.episode} />;
				})}
				{loading && <p>Загрузка...</p>}
				{error && <p>Ошибка...</p>}
			</div>
		</div>
	);
};
