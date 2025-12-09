import { useEffect, useState } from 'react';
import { LocationCard } from './components';
import { useSortParams } from '../../hooks';
import { SortPanel } from '../../components/SortPanel';

interface Location {
	id: number;
	name: string;
	type: string;
	dimension: string;
	created: string;
}

export const LocationsPage = () => {
	const [locations, setLocations] = useState<Location[]>([]);
	const { sortOrder, setSortOrder } = useSortParams();

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

	const sortedLocations = [...locations].sort((a, b) => {
		const dateA = new Date(a.created).getTime();
		const dateB = new Date(b.created).getTime();
		return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
	});

	return (
		<>
			<h1>Локации</h1>
			<SortPanel label='Сортировать по дате создания' sortOrder={sortOrder} setSortOrder={setSortOrder} />

			<div className='grid-content'>
				{sortedLocations.map((location) => (
					<LocationCard key={location.id} id={location.id} name={location.name} />
				))}
			</div>
		</>
	);
};
