import { useCallback, useRef, useState } from 'react';
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
	const [pageNumber, setPageNumber] = useState(1);

	const { loading, error, data, hasMore } = useRickAndMortyData<Hero>('character', pageNumber);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastNodeRef = useCallback(
		(node: HTMLDivElement) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					console.log('Visible');

					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[hasMore, loading]
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
