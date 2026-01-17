import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import { publicRoute } from '@/shared/constants';
import style from './LocationCard.module.css';

type LocationCardProps = {
	id: number;
	name: string;
};

export const LocationCard = forwardRef<HTMLDivElement, LocationCardProps>(({ id, name }, ref) => {
	return (
		<div ref={ref} className={style.container}>
			<Link to={publicRoute.location(`${id}`)}>
				<div className={style.locationInfo}>
					<h3>{name}</h3>
				</div>
			</Link>
		</div>
	);
});
