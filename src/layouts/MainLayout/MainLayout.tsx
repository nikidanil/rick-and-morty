import { Outlet } from 'react-router-dom';
import { Header } from './components';
import style from './MainLayout.module.css';
import { Suspense } from 'react';

export const MainLayout = () => {
	return (
		<>
			<Header />
			<main className={style.container}>
				<Suspense fallback={<div>Загрузка...</div>}>
					<Outlet />
				</Suspense>
			</main>
		</>
	);
};
