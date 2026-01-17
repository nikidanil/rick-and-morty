import { useCallback, useRef } from 'react';
import { EpisodeCard } from '../EpisodeCard';
import type { Episode } from '../../types';

type EpisodeListProps = {
	data: Episode[];
	loading: boolean;
	error: string | null;
	hasMore: boolean;
	loadNext: () => void;
};

export const EpisodeList = ({ data, loading, error, hasMore, loadNext }: EpisodeListProps) => {
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
		[hasMore, loadNext, loading],
	);

	return (
		<div className='grid-content'>
			{data.map((episode, index) => {
				if (index === data.length - 5) {
					return (
						<div ref={lastNodeRef} key={episode.id}>
							<EpisodeCard id={episode.id} episode={episode.episode} />
						</div>
					);
				}

				return <EpisodeCard key={episode.id} id={episode.id} episode={episode.episode} />;
			})}
			{loading && <p>Загрузка...</p>}
			{error && <p>Ошибка...</p>}
		</div>
	);
};
