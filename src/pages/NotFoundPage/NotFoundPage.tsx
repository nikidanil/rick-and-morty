import { Link } from 'react-router-dom';
import { publicRoute } from '../../constants';
import style from './NotFoundPage.module.css';

/**
 * Компонент страницы 404 (страница не найдена).
 *
 * Отображается при переходе по несуществующему маршруту.
 * Содержит стилизованное сообщение в тематике "Рик и Морти" и ссылку на главную страницу.
 *
 * @returns {JSX.Element} Страница с информацией о том, что запрашиваемая страница не найдена.
 */
export const NotFoundPage = () => {
	return (
		<div className={style.notFoundContainer}>
			<header className={style.header}>
				<h1>404</h1>
				<p>Страница потерялась во времени и пространстве.</p>
			</header>

			<main className={style.mainContent}>
				<section className={style.message}>
					<p>
						Похоже, ты забрёл слишком далеко даже для мультивселенной. Эта страница не существует... или её
						стёрли хронобомбой.
					</p>
				</section>

				<section className={style.actions}>
					<Link to={publicRoute.home} className={style.homeLink}>
						Вернуться домой, кожаный мешок
					</Link>
				</section>

				<section className={style.quote}>
					<blockquote>
						«Иногда ничего — это самое крутое, что может случиться.»
						<footer>— Рик Санчез</footer>
					</blockquote>
				</section>
			</main>
		</div>
	);
};
