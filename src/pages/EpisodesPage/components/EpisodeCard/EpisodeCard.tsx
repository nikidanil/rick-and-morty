import { Link } from 'react-router-dom';
import { publicRoute } from '../../../../constants';
import style from './EpisodeCard.module.css';

type EpisodeCardProps = {
	id: number;
	episode: string;
};

export const EpisodeCard = ({ id, episode }: EpisodeCardProps) => {
	return (
		<div className={style.container}>
			<Link to={publicRoute.episode(`${id}`)}>
				<div className={style.episodeInfo}>
					<h3>{episode}</h3>
				</div>
			</Link>
		</div>
	);
};
