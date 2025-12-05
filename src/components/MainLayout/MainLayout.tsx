import { Outlet } from 'react-router-dom';
import { Header } from './components';
import style from './MainLayout.module.css';

export const MainLayout = () => {
	return (
		<>
			<Header />
			<main className={style.container}>
				Main Layout
				<Outlet />
			</main>
		</>
	);
};
