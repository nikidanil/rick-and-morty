import { Link } from 'react-router-dom';
import { publicRoute } from '../../../../constants';
import style from './LocationCard.module.css';

type LocationCardProps = {
	id: number;
	name: string;
};

export const LocationCard = ({ id, name }: LocationCardProps) => {
	return (
		<div className={style.container}>
			<Link to={publicRoute.location(`${id}`)}>
				<div className={style.locationInfo}>
					<h3>{name}</h3>
				</div>
			</Link>
		</div>
	);
};
