import { useEffect, useState } from 'react';
import { HeroCard } from './components';

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

	return (
		<div>
			<h1>Персонажи</h1>
			<div className='grid-content'>
				{heroes.map((hero) => (
					<HeroCard key={hero.id} id={hero.id} name={hero.name} image={hero.image} />
				))}
			</div>
		</div>
	);
};
