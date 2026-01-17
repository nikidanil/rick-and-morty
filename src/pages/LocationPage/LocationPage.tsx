import { useLocationDataById } from '@/entities/location';
import { InfoCard } from '@/shared/ui';

export const LocationPage = () => {
	const data = useLocationDataById();

	return (
		<>
			<h1>{data?.name}</h1>

			<div className='info-content'>
				<InfoCard
					title='Информация о локации'
					infoValues={[
						['Тип', data?.type],
						['Измерение', data?.dimension],
					]}
				/>
			</div>
		</>
	);
};
