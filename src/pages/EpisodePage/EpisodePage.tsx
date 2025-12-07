import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './EpisodePage.module.css';

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
		<div>
			<h1>{episodeData?.name}</h1>

			<div className={style.episodeContent}>
				<div className={style.episodeDetails}>
					<h2>Информация о серии</h2>

					<div className={style.episodeFeatures}>
						<div className={style.feature}>
							<span className={style.label}>Название:</span>
							<span className={style.value}>{episodeData?.name}</span>
						</div>
						<div className={style.feature}>
							<span className={style.label}>Эпизод:</span>
							<span className={style.value}>{episodeData?.episode}</span>
						</div>
						<div className={style.feature}>
							<span className={style.label}>Дата выпуска:</span>
							<span className={style.value}>{episodeData?.air_date}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
