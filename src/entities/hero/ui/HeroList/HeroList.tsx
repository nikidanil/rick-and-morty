import { useCallback, useRef } from 'react';
import type { Hero } from '../../types';
import { HeroCard } from '../HeroCard';

type HeroListProps = {
	data: Hero[];
	loading: boolean;
	error: string | null;
	hasMore: boolean;
	loadNext: () => void;
};

export const HeroList = ({ data, loading, error, hasMore, loadNext }: HeroListProps) => {
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
			{data.map((hero, index) => {
				if (index === data.length - 5) {
					return (
						<div ref={lastNodeRef} key={hero.id}>
							<HeroCard key={hero.id} id={hero.id} name={hero.name} image={hero.image} />
						</div>
					);
				}

				return <HeroCard key={hero.id} id={hero.id} name={hero.name} image={hero.image} />;
			})}
			{loading && <p>Загрузка...</p>}
			{error && <p>Ошибка...</p>}
		</div>
	);
};
