import { useEffect, useState } from 'react';
import { EpisodeCard } from './components';
import { useSortParams } from '../../hooks';
import { SortPanel } from '../../components/SortPanel';

interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	created: string;
}

export const EpisodesPage = () => {
	const [episodes, setEpisodes] = useState<Episode[]>([]);
	const { sortOrder, setSortOrder } = useSortParams();

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

	const sortedEpisodes = [...episodes].sort((a, b) => {
		const dateA = new Date(a.created).getTime();
		const dateB = new Date(b.created).getTime();
		return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
	});

	return (
		<div>
			<h1>Серии</h1>
			<SortPanel label='Сортировать по дате создания' sortOrder={sortOrder} setSortOrder={setSortOrder} />

			<div className='grid-content'>
				{sortedEpisodes.map((ep) => (
					<EpisodeCard key={ep.id} id={ep.id} episode={ep.episode} />
				))}
			</div>
		</div>
	);
};
