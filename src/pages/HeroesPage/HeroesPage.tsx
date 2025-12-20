import { useCallback, useRef } from 'react';
import { HeroCard } from './components';
import { useRickAndMortyData, useSortParams } from '../../hooks';
import { SortPanel } from '../../components/SortPanel';
interface Hero {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	image: string;
	created: string;
}

export const HeroesPage = () => {
	const { sortOrder, setSortOrder } = useSortParams();

	const { loading, error, data, hasMore, loadNext } = useRickAndMortyData<Hero>('character', sortOrder);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastNodeRef = useCallback(
		(node: HTMLDivElement) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					console.log('Visible');

					loadNext();
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[hasMore, loadNext, loading]
	);

	const sortedHeroes = [...data].sort((a, b) => {
		const dateA = new Date(a.created).getTime();
		const dateB = new Date(b.created).getTime();
		return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
	});

	return (
		<div>
			<h1>Персонажи</h1>
			<SortPanel label='Сортировать по дате создания' sortOrder={sortOrder} setSortOrder={setSortOrder} />

			<div className='grid-content'>
				{sortedHeroes.map((hero, index) => {
					if (index === sortedHeroes.length - 5) {
						return (
							<HeroCard
								ref={lastNodeRef}
								key={hero.id}
								id={hero.id}
								name={hero.name}
								image={hero.image}
							/>
						);
					}

					return <HeroCard key={hero.id} id={hero.id} name={hero.name} image={hero.image} />;
				})}
				{loading && <p>Загрузка...</p>}
				{error && <p>Ошибка...</p>}
			</div>
		</div>
	);
};
