import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './HeroPage.module.css';

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
				const response = await fetch(`http://localhost:3000/characters/${id}`);
				const data = await response.json();
				setHeroData(data);
			} catch (error) {
				console.error('Error fetching hero:', error);
			}
		};

		fetchHeroData();
	}, [id]);

	return (
		<div>
			<h1>{heroData?.name}</h1>

			<div className={style.heroContent}>
				<div className={style.heroPhoto}>
					<img src={heroData?.image} alt={heroData?.name} />
				</div>

				<div className={style.heroDetails}>
					<h2>Информация о персонаже</h2>

					<div className={style.heroFeatures}>
						<div className={style.feature}>
							<span className={style.label}>Статус:</span>
							<span className={style.value}>{heroData?.status}</span>
						</div>
						<div className={style.feature}>
							<span className={style.label}>Вид:</span>
							<span className={style.value}>{heroData?.species}</span>
						</div>
						<div className={style.feature}>
							<span className={style.label}>Тип:</span>
							<span className={style.value}>{heroData?.type}</span>
						</div>
						<div className={style.feature}>
							<span className={style.label}>Гендер:</span>
							<span className={style.value}>{heroData?.gender}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
