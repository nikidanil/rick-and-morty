import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './LocationPage.module.css';

interface Location {
	id: number;
	name: string;
	type: string;
	dimension: string;
	created: string;
}

export const LocationPage = () => {
	const [locationData, setLocationData] = useState<Location | null>(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchLocationData = async () => {
			try {
				const response = await fetch(`http://localhost:3000/locations/${id}`);
				const data = await response.json();
				setLocationData(data);
			} catch (error) {
				console.error('Error fetching location:', error);
			}
		};

		fetchLocationData();
	}, [id]);

	return (
		<div>
			<h1>{locationData?.name}</h1>

			<div className={style.locationContent}>
				<div className={style.locationDetails}>
					<h2>Информация о локации</h2>

					<div className={style.locationFeatures}>
						<div className={style.feature}>
							<span className={style.label}>Тип:</span>
							<span className={style.value}>{locationData?.type}</span>
						</div>
						<div className={style.feature}>
							<span className={style.label}>Измерение:</span>
							<span className={style.value}>{locationData?.dimension}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
