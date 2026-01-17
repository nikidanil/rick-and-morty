import { useEpisodeDataById } from '@/entities/episode/model/useEpisodeDataById';
import { InfoCard } from '@/shared/ui';

export const EpisodePage = () => {
	const data = useEpisodeDataById();
	return (
		<>
			<h1>{data?.name}</h1>

			<div className='info-content'>
				<InfoCard
					title='Информация о серии'
					infoValues={[
						['Название', data?.name],
						['Эпизод', data?.episode],
						['Дата Выпуска', data?.air_date],
					]}
				/>
			</div>
		</>
	);
};
