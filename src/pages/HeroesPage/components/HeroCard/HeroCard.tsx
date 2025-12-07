import { Link } from 'react-router-dom';
import { publicRoute } from '../../../../constants';
import style from './HeroCard.module.css';

type HeroCardProps = {
	id: number;
	name: string;
	image: string;
};

export const HeroCard = ({ id, name, image }: HeroCardProps) => {
	return (
		<div className={style.container}>
			<Link to={`${publicRoute.heroes}/${id}`}>
				<img src={image} alt={name} className={style.heroImage} />
				<div className={style.heroInfo}>
					<h3>{name}</h3>
				</div>
			</Link>
		</div>
	);
};
