import { useHeroDataById } from '@/entities/hero';
import { InfoCard, PhotoCard } from '@/shared/ui';

export const HeroPage = () => {
	const data = useHeroDataById();

	return (
		<>
			<h1>{data?.name}</h1>

			<div className='info-content'>
				{data && <PhotoCard src={data.image} alt={data.name} />}

				<InfoCard
					title='Информация о персонаже'
					infoValues={[
						['Статус', data?.status],
						['Вид', data?.species],
						['Тип', data?.type],
						['Гендер', data?.gender],
					]}
				/>
			</div>
		</>
	);
};
