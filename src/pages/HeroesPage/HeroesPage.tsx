import { useEffect, useState } from 'react';
import { HeroCard } from './components';
import { useSortParams } from '../../hooks';
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
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const { sortOrder, setSortOrder } = useSortParams();

	useEffect(() => {
		const fetchHeroes = async () => {
			try {
				const response = await fetch('http://localhost:3000/characters');
				const data = await response.json();
				setHeroes(data);
			} catch (error) {
				console.error('Error fetching heroes:', error);
			}
		};

		fetchHeroes();
	}, []);

	const sortedHeroes = [...heroes].sort((a, b) => {
		const dateA = new Date(a.created).getTime();
		const dateB = new Date(b.created).getTime();
		return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
	});

	return (
		<div>
			<h1>Персонажи</h1>
			<SortPanel label='Сортировать по дате создания' sortOrder={sortOrder} setSortOrder={setSortOrder} />

			<div className='grid-content'>
				{sortedHeroes.map((hero) => (
					<HeroCard key={hero.id} id={hero.id} name={hero.name} image={hero.image} />
				))}
			</div>
		</div>
	);
};
