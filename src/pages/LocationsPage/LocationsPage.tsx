import { useEffect, useState } from 'react';
import { LocationCard } from './components';
import style from './LocationsPage.module.css';

interface Location {
	id: number;
	name: string;
	type: string;
	dimension: string;
	created: string;
}

export const LocationsPage = () => {
	const [locations, setLocations] = useState<Location[]>([]);

	useEffect(() => {
		const fetchHeroes = async () => {
			try {
				const response = await fetch('http://localhost:3000/locations');
				const data = await response.json();
				setLocations(data);
			} catch (error) {
				console.error('Error fetching heroes:', error);
			}
		};

		fetchHeroes();
	}, []);

	return (
		<div>
			<h1>Локации</h1>
			<div className={style.locationsGrid}>
				{locations.map((location) => (
					<LocationCard key={location.id} id={location.id} name={location.name} />
				))}
			</div>
		</div>
	);
};
