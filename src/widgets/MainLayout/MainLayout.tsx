import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Header } from '../Header';
import { ErrorBoundary } from '@/shared/ui';
import style from './MainLayout.module.css';

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
