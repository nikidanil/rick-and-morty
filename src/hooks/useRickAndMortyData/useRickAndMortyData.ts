import axios from 'axios';
import { BASE_WEB_URL } from '../../constants';
import { useCallback, useEffect, useState } from 'react';

/**
 * Допустимые категории данных из API Rick and Morty.
 * Определяет, какие типы сущностей можно запрашивать.
 */
type Category = 'character' | 'location' | 'episode';

/**
 * Порядок сортировки данных.
 * `asc` — по возрастанию (от первой к последней странице).
 * `desc` — по убыванию (от последней к первой странице).
 */
type SortOrder = 'asc' | 'desc';

/**
 * Общий формат ответа от API Rick and Morty.
 * 
 * @template T - Тип элементов в массиве результатов.
 */
type ResponseData<T> = {
	/**
	 * Объект с информацией о пагинации и количестве элементов.
	 */
	info: {
		/**
		 * Общее количество элементов в категории.
		 */
		count: number;
		/**
		 * Общее количество страниц при текущем размере страницы.
		 */
		pages: number;
		/**
		 * URL следующей страницы, или `null`, если следующей страницы нет.
		 */
		next: string | null;
		/**
		 * URL предыдущей страницы, или `null`, если предыдущей страницы нет.
		 */
		prev: string | null;
	};
	/**
	 * Массив результатов, содержащий данные запрашиваемой категории.
	 */
	results: T[];
};

/**
 * Внутреннее состояние хука, управляющее пагинацией и данными.
 * 
 * @template R - Тип данных, загружаемых из API.
 */
type HookState<R> = {
	/**
	 * Номер текущей страницы.
	 * Увеличивается при вызове `loadNext`.
	 */
	page: number;
	/**
	 * Массив уже загруженных данных.
	 * Пополняется при каждой успешной подгрузке.
	 */
	data: R[];
	/**
	 * Текущий порядок сортировки.
	 */
	sortOrder: SortOrder;
};

/**
 * Состояние для хранения закэшированных метаданных.
 * Используется для отслеживания общего количества страниц и элементов.
 */
type CacheState = {
	/**
	 * Общее количество страниц по текущей категории.
	 * `null`, если данные ещё не загружены.
	 */
	totalPages: number | null;
	/**
	 * Общее количество элементов по текущей категории.
	 * `null`, если данные ещё не загружены.
	 */
	totalCount: number | null;
};

/**
 * Возвращает начальное состояние хука.
 * 
 * @param order - Порядок сортировки, с которым будет инициализирован хук.
 * @returns Объект с начальными значениями страницы, данных и порядка сортировки.
 * @template R - Тип данных, с которыми работает хук.
 */
const getInitialHookState = <R>(order: SortOrder): HookState<R> => ({
	page: 1,
	data: [],
	sortOrder: order,
});

/**
 * Глобальный кэш для хранения метаданных по категориям.
 * Позволяет избежать повторной загрузки информации о количестве страниц и элементов
 * при переключении между режимами сортировки или повторном рендере.
 */
const metaCache = new Map<Category, { totalCount: number; totalPages: number }>();

/**
 * Кастомный хук для пагинации данных из API Rick and Morty.
 * 
 * Хук реализует:
 * - Постраничную загрузку данных (infinite scroll).
 * - Поддержку сортировки: по возрастанию (`asc`) и убыванию (`desc`).
 * - Кэширование метаданных (общее количество элементов и страниц) для избежания повторных запросов.
 * - Автоматическую подгрузку при прокрутке.
 * - Корректную обработку смены категории и порядка сортировки.
 * 
 * @example
 * const { data, loading, error, hasMore, loadNext } = useRickAndMortyData<Character>('character', 'asc');
 * 
 * @template R - Тип данных, возвращаемых API (например, `Character`, `Location`, `Episode`).
 * @param category - Категория данных для загрузки (`character`, `location`, `episode`).
 * @param order - Порядок сортировки (`asc` или `desc`).
 * @returns Объект с состоянием и действиями:
 * - `loading` — идёт ли загрузка.
 * - `error` — сообщение об ошибке, если произошла.
 * - `data` — массив загруженных данных.
 * - `hasMore` — есть ли ещё данные для подгрузки.
 * - `loadNext` — функция для загрузки следующей страницы.
 */
export const useRickAndMortyData = <R>(category: Category, order: SortOrder) => {
	// --- Состояние ---
	const [hookState, setHookState] = useState<HookState<R>>(() => getInitialHookState(order));
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [hasMore, setHasMore] = useState(false);

	/**
	 * Состояние кэшированных метаданных.
	 * Инициализируется из глобального кэша `metaCache`, если данные уже были загружены ранее.
	 */
	const [cacheState, setCacheState] = useState<CacheState>(() => {
		const cached = metaCache.get(category);
		return {
			totalCount: cached?.totalCount || null,
			totalPages: cached?.totalPages || null,
		};
	});

	const { page, data, sortOrder } = hookState;
	const { totalPages, totalCount } = cacheState;
	/**
	 * Флаг, указывающий, загружены ли уже все доступные данные.
	 * Используется для предотвращения лишних запросов.
	 */
	const hasLoadedAll = totalCount !== null && data.length >= totalCount;

	/**
	 * Эффект для загрузки метаданных (общее количество элементов и страниц).
	 * Выполняется только если метаданные ещё не загружены.
	 * 
	 * Запрашивает первую страницу (`page=1`) для получения `info.count` и `info.pages`.
	 * Результат сохраняется как в локальном состоянии, так и в глобальном кэше `metaCache`.
	 * 
	 * Использует `AbortController` для отмены запроса при размонтировании или изменении зависимостей.
	 */
	useEffect(() => {
		// Если метаданные уже загружены — пропускаем запрос
		if (totalPages && totalCount) return;

		const controller = new AbortController();

		const fetchMeta = async () => {
			try {
				// Запрашиваем первую страницу, чтобы получить общую статистику
				const response = await axios.get<ResponseData<R>>(`${BASE_WEB_URL}/${category}`, {
					params: { page: 1 },
					signal: controller.signal,
				});

				const { info } = response.data;
				const meta = { totalCount: info.count, totalPages: info.pages };

				// Сохраняем метаданные в локальное состояние
				setCacheState(meta);
				// Кэшируем в глобальный кэш для повторного использования
				metaCache.set(category, meta);
			} catch (err) {
				// Обрабатываем ошибку только если запрос не был отменён и метаданные ещё не загружены
				if (!axios.isCancel(err) && err instanceof Error && !totalPages && !totalCount) {
					setError('Не удалось загрузить метаданные');
				}
			}
		};

		fetchMeta();

		// Отменяем запрос при размонтировании компонента или изменении зависимостей
		return () => {
			controller.abort();
		};
	}, [category, totalPages, totalCount]);

	/**
	 * Эффект для сброса пагинации при изменении категории или порядка сортировки.
	 * 
	 * Если данные ещё не были полностью загружены — сбрасывает страницу на 1.
	 * В противном случае сохраняет текущую страницу (например, при переключении `asc`/`desc`).
	 * Также обновляет порядок сортировки.
	 */
	useEffect(() => {
		setHookState((prev) => ({
			...prev,
			// Сбрасываем на первую страницу только если данные не были загружены полностью
			page: hasLoadedAll ? prev.page : 1,
			// Всегда обновляем порядок сортировки
			sortOrder: order,
		}));
	}, [category, order, hasLoadedAll]);

	/**
	 * Эффект для загрузки данных постранично.
	 * 
	 * Запускается только после загрузки метаданных (`totalPages`, `totalCount`).
	 * 
	 * Особенности:
	 * - При `order: 'desc'` страницы загружаются с конца: `pageToFetch = totalPages - page + 1`.
	 * - При первом запросе (`page === 1`) очищает предыдущие данные, если они не были полностью загружены.
	 * - Проверяет, не превышено ли общее количество страниц.
	 * - Обновляет флаг `hasMore` на основе наличия следующей страницы и общего количества.
	 * 
	 * Использует `AbortController` для безопасности при отмене запросов.
	 */
	useEffect(() => {
		// Прерываем выполнение, если метаданные ещё не загружены
		if (!totalPages || !totalCount) {
			setLoading(false);
			return;
		}

		const controller = new AbortController();

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				// Определяем, нужно ли очистить предыдущие данные (например, при первой загрузке)
				const shouldReset = !hasLoadedAll && page === 1;
				if (shouldReset) {
					// Очищаем список, чтобы начать с чистого листа
					setHookState((prev) => ({ ...prev, data: [] }));
				}

				// Проверяем, не был ли запрос отменён (например, из-за размонтирования)
				if (controller.signal.aborted) return;

				// Если все данные уже загружены — больше не грузим
				if (hasLoadedAll) {
					setLoading(false);
					setHasMore(false);
					return;
				}

				// Определяем, какую страницу нужно загрузить:
				// при 'desc' — идём с конца: totalPages - page + 1
				// при 'asc' — по порядку: page
				const pageToFetch = sortOrder === 'desc' && totalPages ? totalPages - page + 1 : page;

				// Защита от некорректных номеров страниц
				if (pageToFetch < 1 || pageToFetch > totalPages) {
					setHasMore(false);
					setLoading(false);
					return;
				}

				// Выполняем запрос к API
				const response = await axios.get<ResponseData<R>>(`${BASE_WEB_URL}/${category}`, {
					params: { page: pageToFetch },
					signal: controller.signal,
				});

				// Проверяем, не был ли запрос отменён между вызовом и ответом
				if (controller.signal.aborted) return;

				const responseData = response.data;
				// Текущее количество элементов (0, если был сброс)
				const currentLength = shouldReset ? 0 : data.length;
				// Новое общее количество после добавления
				const newLength = currentLength + responseData.results.length;
				// Определяем, является ли текущая страница последней
				const isLastPage = sortOrder === 'desc' ? pageToFetch === 1 : !responseData.info.next;

				// Обновляем флаг: можно ли подгружать дальше
				setHasMore(!isLastPage && newLength < totalCount);

				// Добавляем новые данные в массив:
				// - если был сброс — заменяем
				// - иначе — добавляем в конец
				setHookState((prev) => ({
					...prev,
					data: shouldReset 
						? [...responseData.results] 
						: [...prev.data, ...responseData.results],
				}));
			} catch (err) {
				// Обрабатываем ошибку только если запрос не был отменён
				if (!axios.isCancel(err) && err instanceof Error) {
					setError('Не удалось загрузить данные');
				}
			} finally {
				// В любом случае — завершаем состояние загрузки
				setLoading(false);
			}
		};

		fetchData();

		// Отменяем запрос при размонтировании или изменении зависимостей
		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category, page, sortOrder, totalPages, totalCount]);

	/**
	 * Функция для подгрузки следующей страницы данных.
	 * 
	 * Увеличивает номер страницы в состоянии, что запускает эффект загрузки.
	 * Выполняется только если есть ещё данные (`hasMore`) и нет активной загрузки (`!loading`).
	 */
	const loadNext = useCallback(() => {
		if (hasMore && !loading) {
			setHookState((prev) => ({
				...prev,
				page: prev.page + 1,
			}));
		}
	}, [hasMore, loading]);

	// --- Возвращаемое значение ---
	return {
		/**
		 * Флаг, указывающий, идёт ли в данный момент загрузка данных.
		 */
		loading,
		/**
		 * Сообщение об ошибке, если произошла ошибка при загрузке.
		 * `null`, если ошибок нет.
		 */
		error,
		/**
		 * Массив уже загруженных данных.
		 */
		data,
		/**
		 * Флаг, указывающий, есть ли ещё данные для подгрузки.
		 * Если `true` — можно вызывать `loadNext`.
		 */
		hasMore,
		/**
		 * Функция для загрузки следующей порции данных.
		 * Безопасна к вызову: проверяет `hasMore` и `loading`.
		 */
		loadNext,
	};
};
