import style from './InfoCard.module.css';

/**
 * Интерфейс свойств компонента InfoCard.
 *
 * @interface InfoCardProps
 * @property {string} title - Заголовок карточки, отображается в верхней части компонента.
 * @property {[string, string?][]} infoValues - Массив кортежей, где каждый кортеж содержит:
 *   - `label` — текст метки (например, "Статус", "Вид" и т.д.);
 *   - `value` — значение метки (необязательное поле, может отсутствовать).
 *
 * Пример:
 * ```ts
 * const infoValues = [
 *   ['Статус', 'Жив'],
 *   ['Вид', 'Человек'],
 *   ['Тип', ''], // Пустое значение
 *   ['Гендер', 'Мужской']
 * ];
 * ```
 */
type InfoCardProps = {
	title: string;
	infoValues: [label: string, value?: string][];
};

/**
 * Компонент карточки информации.
 *
 * Отображает структурированную информацию в виде списка пар "метка — значение"
 * под заголовком. Используется, например, для отображения деталей персонажа, локации или эпизода.
 *
 * @param {InfoCardProps} props - Свойства компонента.
 * @param {string} props.title - Заголовок карточки.
 * @param {Array<[string, string?]>} props.infoValues - Массив данных для отображения.
 *
 * @example
 * <InfoCard
 *   title="Информация о персонаже"
 *   infoValues={[
 *     ['Статус', 'Жив'],
 *     ['Вид', 'Человек'],
 *     ['Гендер', 'Мужской']
 *   ]}
 * />
 *
 * @returns {JSX.Element} JSX-разметка карточки информации.
 */
export const InfoCard = ({ title, infoValues }: InfoCardProps) => {
	return (
		<div className={style.details}>
			<h2>{title}</h2>

			<div className={style.features}>
				{infoValues.map((info) => (
					<div key={info[1] || info[0]} className={style.feature}>
						<span className={style.label}>{info[0]}:</span>
						<span className={style.value}>{info[1]}</span>
					</div>
				))}
			</div>
		</div>
	);
};
