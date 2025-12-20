import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InfoCard } from '../../components/common';
import { BASE_WEB_URL } from '../../constants';

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
				const response = await fetch(`${BASE_WEB_URL}/location/${id}`);
				const data = await response.json();
				setLocationData(data);
			} catch (error) {
				console.error('Error fetching location:', error);
			}
		};

		fetchLocationData();
	}, [id]);

	return (
		<>
			<h1>{locationData?.name}</h1>

			<div className='info-content'>
				<InfoCard
					title='Информация о локации'
					infoValues={[
						['Тип', locationData?.type],
						['Измерение', locationData?.dimension],
					]}
				/>
			</div>
		</>
	);
};
