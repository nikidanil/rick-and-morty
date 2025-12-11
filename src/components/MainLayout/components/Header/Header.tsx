import { Link, NavLink } from 'react-router-dom';
import { publicRoute } from '../../../../constants';
import style from './Header.module.css';

export const Header = () => {
	return (
		<header className={style.header}>
			<nav className={style.nav}>
				<Link className={style.logo} to={publicRoute.home}>
					Rick & Morty
				</Link>

				<div className={style.navCategory}>
					<NavLink className={style.navLink} to={publicRoute.heroes} end>
						Персонажи
					</NavLink>
					<NavLink className={style.navLink} to={publicRoute.locations} end>
						Локации
					</NavLink>
					<NavLink className={style.navLink} to={publicRoute.episodes} end>
						Эпизоды
					</NavLink>
					<NavLink className={style.navLink} to={publicRoute.login} end>
						Вход
					</NavLink>
				</div>
			</nav>
		</header>
	);
};
