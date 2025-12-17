import { Outlet } from 'react-router-dom';
import { Header } from './components';
import style from './MainLayout.module.css';
import { Suspense } from 'react';
import { ErrorBoundary } from '../../components';

export const MainLayout = () => {
	return (
		<>
			<Header />
			<main className={style.container}>
				<ErrorBoundary fallback={<p>Резервный интерфейс при ошибке.</p>}>
					<Suspense fallback={<div>Загрузка...</div>}>
						<Outlet />
					</Suspense>
				</ErrorBoundary>
			</main>
		</>
	);
};
