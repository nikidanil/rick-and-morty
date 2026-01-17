import { publicRoute } from '@/shared/constants';
import style from './HeroCard.module.css';
import { Link } from 'react-router-dom';

type HeroCardProps = {
	id: number;
	name: string;
	image: string;
};

export const HeroCard = ({ id, name, image }: HeroCardProps) => {
	return (
		<div className={style.container}>
			<Link to={publicRoute.hero(`${id}`)}>
				<img src={image} alt={name} className={style.heroImage} />
				<div className={style.heroInfo}>
					<h3>{name}</h3>
				</div>
			</Link>
		</div>
	);
};
