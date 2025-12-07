import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InfoCard } from '../../components/common';

interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	created: string;
}

export const EpisodePage = () => {
	const [episodeData, setEpisodeData] = useState<Episode | null>(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchEpisodeData = async () => {
			try {
				const response = await fetch(`http://localhost:3000/episodes/${id}`);
				const data = await response.json();
				setEpisodeData(data);
			} catch (error) {
				console.error('Error fetching episode:', error);
			}
		};

		fetchEpisodeData();
	}, [id]);

	return (
		<>
			<h1>{episodeData?.name}</h1>

			<div className='info-content'>
				<InfoCard
					title='Информация о серии'
					infoValues={[
						['Название', episodeData?.name],
						['Эпизод', episodeData?.episode],
						['Дата Выпуска', episodeData?.air_date],
					]}
				/>
			</div>
		</>
	);
};
