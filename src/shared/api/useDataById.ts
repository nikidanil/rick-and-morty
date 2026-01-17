import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Category } from '../types';
import { BASE_WEB_URL } from './api';

export const useDataById = <R>(category: Category) => {
	const [data, setData] = useState<R | null>(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchEpisodeData = async () => {
			try {
				const response = await fetch(`${BASE_WEB_URL}/${category}/${id}`);
				const data = await response.json();
				setData(data);
			} catch (error) {
				console.error('Error fetching episode:', error);
			}
		};

		fetchEpisodeData();
	}, [category, id]);

	return data;
};
