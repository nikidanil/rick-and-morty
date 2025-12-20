import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InfoCard, PhotoCard } from '../../components/common';
import { BASE_WEB_URL } from '../../constants';

interface Hero {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	image: string;
	created: string;
}

export const HeroPage = () => {
	const [heroData, setHeroData] = useState<Hero | null>(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchHeroData = async () => {
			try {
				const response = await fetch(`${BASE_WEB_URL}/character/${id}`);
				const data = await response.json();
				setHeroData(data);
			} catch (error) {
				console.error('Error fetching hero:', error);
			}
		};

		fetchHeroData();
	}, [id]);

	return (
		<>
			<h1>{heroData?.name}</h1>

			<div className='info-content'>
				{heroData && <PhotoCard src={heroData.image} alt={heroData.name} />}

				<InfoCard
					title='Информация о персонаже'
					infoValues={[
						['Статус', heroData?.status],
						['Вид', heroData?.species],
						['Тип', heroData?.type],
						['Гендер', heroData?.gender],
					]}
				/>
			</div>
		</>
	);
};
