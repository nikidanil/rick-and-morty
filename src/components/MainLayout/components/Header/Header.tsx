import { Link, NavLink, useNavigate } from 'react-router-dom';
import { publicRoute } from '../../../../constants';
import style from './Header.module.css';
import { useAuth } from '../../../../hooks';

export const Header = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		auth?.signOut(() => {
			navigate('/');
		});
	};

	return (
		<header className={style.header}>
			<nav className={style.nav}>
				<Link className={style.logo} to={publicRoute.home}>
					Rick & Morty
				</Link>

				<div className={style.navCategory}>
					{auth?.user ? (
						<div>
							<NavLink className={style.navLink} to={publicRoute.heroes} end>
								Персонажи
							</NavLink>
							<NavLink className={style.navLink} to={publicRoute.locations} end>
								Локации
							</NavLink>
							<NavLink className={style.navLink} to={publicRoute.episodes} end>
								Эпизоды
							</NavLink>

							<span className={style.userText}>Добро пожаловать, {auth.user} !</span>
							<button className={style.logoutButton} onClick={handleLogout}>
								Выход
							</button>
						</div>
					) : (
						<NavLink className={style.navLink} to={publicRoute.login} end>
							Вход
						</NavLink>
					)}
				</div>
			</nav>
		</header>
	);
};
