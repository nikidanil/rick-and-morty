import { useEffect, useState } from 'react';
import { EpisodeCard } from './components';

interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	created: string;
}

export const EpisodesPage = () => {
	const [episodes, setEpisodes] = useState<Episode[]>([]);

	useEffect(() => {
		const fetchHeroes = async () => {
			try {
				const response = await fetch('http://localhost:3000/episodes');
				const data = await response.json();
				setEpisodes(data);
			} catch (error) {
				console.error('Error fetching heroes:', error);
			}
		};

		fetchHeroes();
	}, []);

	return (
		<div>
			<h1>Серии</h1>
			<div className='grid-content'>
				{episodes.map((ep) => (
					<EpisodeCard key={ep.id} id={ep.id} episode={ep.episode} />
				))}
			</div>
		</div>
	);
};
