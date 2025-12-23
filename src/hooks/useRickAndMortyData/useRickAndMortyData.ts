import axios from 'axios';
import { BASE_WEB_URL } from '../../constants';
import { useCallback, useEffect, useState } from 'react';

type Category = 'character' | 'location' | 'episode';

type SortOrder = 'asc' | 'desc';

type ResponseData<T> = {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: T[];
};

type HookState<R> = {
	page: number;
	data: R[];
	sortOrder: SortOrder;
};

type CacheState = {
	totalPages: number | null;
	totalCount: number | null;
};

const getInitialHookState = <R>(order: SortOrder): HookState<R> => ({
	page: 1,
	data: [],
	sortOrder: order,
});

const metaCache = new Map<Category, { totalCount: number; totalPages: number }>();

export const useRickAndMortyData = <R>(category: Category, order: SortOrder) => {
	const [hookState, setHookState] = useState<HookState<R>>(() => getInitialHookState(order));
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [hasMore, setHasMore] = useState(false);

	const [cacheState, setCacheState] = useState<CacheState>(() => {
		const cached = metaCache.get(category);
		return {
			totalCount: cached?.totalCount || null,
			totalPages: cached?.totalPages || null,
		};
	});

	const { page, data, sortOrder } = hookState;
	const { totalPages, totalCount } = cacheState;

	const hasLoadedAll = totalCount !== null && data.length >= totalCount;

	useEffect(() => {
		if (totalPages && totalCount) return;

		const controller = new AbortController();

		const fetchMeta = async () => {
			try {
				const response = await axios.get<ResponseData<R>>(`${BASE_WEB_URL}/${category}`, {
					params: { page: 1 },
					signal: controller.signal,
				});

				const { info } = response.data;
				const meta = { totalCount: info.count, totalPages: info.pages };

				setCacheState(meta);
				metaCache.set(category, meta);
			} catch (err) {
				if (!axios.isCancel(err) && err instanceof Error && !totalPages && !totalCount) {
					setError('Не удалось загрузить метаданные');
				}
			}
		};

		fetchMeta();

		return () => {
			controller.abort();
		};
	}, [category, totalPages, totalCount]);

	useEffect(() => {
		setHookState((prev) => ({
			...prev,
			page: hasLoadedAll ? prev.page : 1,
			sortOrder: order,
		}));
	}, [category, order, hasLoadedAll]);

	useEffect(() => {
		if (!totalPages || !totalCount) {
			setLoading(false);
			return;
		}

		const controller = new AbortController();

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const shouldReset = !hasLoadedAll && page === 1;
				if (shouldReset) {
					setHookState((prev) => ({ ...prev, data: [] }));
				}

				if (controller.signal.aborted) return;

				if (hasLoadedAll) {
					setLoading(false);
					setHasMore(false);
					return;
				}

				const pageToFetch = sortOrder === 'desc' && totalPages ? totalPages - page + 1 : page;

				if (pageToFetch < 1 || pageToFetch > totalPages) {
					setHasMore(false);
					setLoading(false);
					return;
				}

				const response = await axios.get<ResponseData<R>>(`${BASE_WEB_URL}/${category}`, {
					params: { page: pageToFetch },
					signal: controller.signal,
				});

				if (controller.signal.aborted) return;

				const responseData = response.data;
				const currentLength = shouldReset ? 0 : data.length;
				const newLength = currentLength + responseData.results.length;
				const isLastPage = sortOrder === 'desc' ? pageToFetch === 1 : !responseData.info.next;

				setHasMore(!isLastPage && newLength < totalCount);

				setHookState((prev) => ({
					...prev,
					data: shouldReset ? [...responseData.results] : [...prev.data, ...responseData.results],
				}));
			} catch (err) {
				if (!axios.isCancel(err) && err instanceof Error) {
					setError('Не удалось загрузить данные');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => {
			controller.abort();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category, page, sortOrder, totalPages, totalCount]);

	const loadNext = useCallback(() => {
		if (hasMore && !loading) {
			setHookState((prev) => ({
				...prev,
				page: prev.page + 1,
			}));
		}
	}, [hasMore, loading]);

	return {
		loading,
		error,
		data,
		hasMore,
		loadNext,
	};
};
