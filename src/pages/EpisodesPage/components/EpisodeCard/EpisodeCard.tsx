import { Link } from 'react-router-dom';
import { publicRoute } from '../../../../constants';
import style from './EpisodeCard.module.css';
import { forwardRef } from 'react';

type EpisodeCardProps = {
	id: number;
	episode: string;
};

export const EpisodeCard = forwardRef<HTMLDivElement, EpisodeCardProps>(({ id, episode }, ref) => {
	return (
		<div ref={ref} className={style.container}>
			<Link to={publicRoute.episode(`${id}`)}>
				<div className={style.episodeInfo}>
					<h3>{episode}</h3>
				</div>
			</Link>
		</div>
	);
});
