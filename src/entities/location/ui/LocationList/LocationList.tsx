import { useCallback, useRef } from 'react';
import type { Location } from '../../types';
import { LocationCard } from '../LocationCard';

type LocationListProps = {
	data: Location[];
	loading: boolean;
	error: string | null;
	hasMore: boolean;
	loadNext: () => void;
};

export const LocationList = ({ data, loading, error, hasMore, loadNext }: LocationListProps) => {
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
			{data.map((location, index) => {
				if (index === data.length - 5) {
					return (
						<div ref={lastNodeRef} key={location.id}>
							<LocationCard key={location.id} id={location.id} name={location.name} />
						</div>
					);
				}

				return <LocationCard key={location.id} id={location.id} name={location.name} />;
			})}
			{loading && <p>Загрузка...</p>}
			{error && <p>Ошибка...</p>}
		</div>
	);
};
