import { Link } from 'react-router-dom';
import { publicRoute } from '../../constants';
import style from './HomePage.module.css';

/**
 * Компонент главной страницы приложения.
 *
 * Отображает приветствие и краткий гайд по навигации по сайту в стиле "Рик и Морти".
 *
 * @returns {JSX.Element} Структурированная главная страница с приветствием и навигационными ссылками.
 */
export const HomePage = () => {
	return (
		<div className={style.homeContainer}>
			<div className={style.header}>
				<h1>Привет, кожаный мешок!</h1>
				<p>
					Добро пожаловать в мультивселенную Рика и Морти — места самых безумных приключений во всех
					измерениях.
				</p>
			</div>

			<main className={style.mainContent}>
				<section className={style.guide}>
					<h2>Что можно сделать?</h2>
					<ul className={style.actionsList}>
						<li>
							<Link to={publicRoute.heroes} className={style.link}>
								Посмотреть всех персонажей
							</Link>
						</li>
						<li>
							<Link to={publicRoute.locations} className={style.link}>
								Исследовать локации
							</Link>
						</li>
						<li>
							<Link to={publicRoute.episodes} className={style.link}>
								Почувствовать эпизоды
							</Link>
						</li>
					</ul>
				</section>

				<section className={style.quote}>
					<blockquote>
						«Живи быстро, умри странно.»
						<footer>— Рик Санчез</footer>
					</blockquote>
				</section>
			</main>
		</div>
	);
};
