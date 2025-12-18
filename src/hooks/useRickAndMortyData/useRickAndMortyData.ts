import axios from 'axios';
import { BASE_WEB_URL } from '../../constants';
import { useEffect, useState } from 'react';

/**
 * Тип категории API, определяющий, какие данные будут запрашиваться.
 *
 * Поддерживаемые значения:
 * - `'character'` — персонажи
 * - `'location'` — локации
 * - `'episode'` — эпизоды
 */
type Category = 'character' | 'location' | 'episode';

/**
 * Общий тип ответа API с пагинацией.
 *
 * @template T - Тип элементов в массиве `results`.
 *
 * @property {object} info - Информация о пагинации.
 * @property {number} info.count - Общее количество элементов.
 * @property {number} info.pages - Общее количество страниц.
 * @property {string | null} info.next - URL следующей страницы или `null`, если нет.
 * @property {string | null} info.prev - URL предыдущей страницы или `null`, если нет.
 * @property {T[]} results - Массив данных текущей страницы.
 */
type ResponseData<T> = {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: T[];
};

/**
 * Хук для загрузки пагинированных данных из Rick and Morty API.
 *
 * Хук автоматически:
 * - Загружает данные по указанной категории и номеру страницы.
 * - Отменяет предыдущий запрос при изменении параметров.
 * - Сбрасывает состояние при смене категории.
 * - Управляет состоянием загрузки, ошибки и наличия следующей страницы.
 *
 * @example
 * const { data, loading, error, hasMore } = useRickAndMortyData<Character>('character', 1);
 *
 * @template R - Тип данных, ожидаемых в результате (например, `Character`, `Episode`).
 *
 * @param {Category} category - Категория данных для загрузки.
 * @param {number} pageNumber - Номер страницы для загрузки (начинается с 1).
 *
 * @returns {{
 *   loading: boolean;
 *   error: string | null;
 *   data: R[];
 *   hasMore: boolean;
 * }} Объект с состоянием:
 * - `loading` — флаг загрузки.
 * - `error` — сообщение об ошибке или `null`.
 * - `data` — массив загруженных данных.
 * - `hasMore` — флаг, указывающий, есть ли следующая страница.
 */
export const useRickAndMortyData = <R>(category: Category, pageNumber: number) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<R[]>([]);
	const [hasMore, setHasMore] = useState(false);

	// Сброс данных при смене категории
	useEffect(() => {
		setData([]);
		setHasMore(false);
	}, [category]);

	// Загрузка данных при изменении категории или номера страницы
	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await axios.get(`${BASE_WEB_URL}/${category}`, {
					params: {
						page: pageNumber,
					},
					signal: controller.signal,
				});

				const responseData: ResponseData<R> = response.data;

				setHasMore(!!responseData.info.next);

				setData((prevData) => {
					return [...prevData, ...responseData.results];
				});
			} catch (error) {
				// Проверяем, является ли ошибка отменой запроса
				if (error instanceof Error && !axios.isCancel(error)) {
					setError('Не удалось загрузить данные');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		// Отмена запроса при размонтировании или изменении зависимостей
		return () => {
			controller.abort();
		};
	}, [category, pageNumber]);

	return {
		loading,
		error,
		data,
		hasMore,
	};
};
