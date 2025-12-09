import { useSearchParams } from 'react-router-dom';

/**
 * Тип, представляющий возможные направления сортировки.
 *
 * @typedef {'asc' | 'desc'} SortOrder
 * @property {'asc'} asc - Сортировка по возрастанию (от старых к новым).
 * @property {'desc'} desc - Сортировка по убыванию (от новых к старым).
 */
type SortOrder = 'asc' | 'desc';

/**
 * Хук для управления порядком сортировки через query-параметр в URL.
 *
 * Позволяет считывать и обновлять параметр сортировки (например, `?sort=asc`) из адресной строки.
 * Поддерживает только значения `'asc'` и `'desc'`. Любое другое значение интерпретируется как `'desc'`.
 * При установке значения `'desc'` параметр удаляется из URL для чистоты адреса.
 *
 * @example
 * const { sortOrder, setSortOrder } = useSortParams();
 * // При открытии /heroes?sort=asc → sortOrder = 'asc'
 * // При вызове setSortOrder('asc') → URL становится /heroes?sort=asc
 * // При вызове setSortOrder('desc') → URL становится /heroes (параметр удаляется)
 *
 * @returns {{
 *   sortOrder: SortOrder;
 *   setSortOrder: (order: SortOrder) => void;
 * }} Объект, содержащий:
 * - `sortOrder` — текущее значение сортировки (`'asc'` или `'desc'`);
 * - `setSortOrder` — функция для изменения порядка сортировки и обновления URL.
 *
 * @since 1.0.0
 */
export const useSortParams = (): { sortOrder: SortOrder; setSortOrder: (order: SortOrder) => void } => {
	const [searchParams, setSearchParams] = useSearchParams();

	/**
	 * Значение параметра `sort` из URL.
	 */
	const urlValue = searchParams.get('sort');

	/**
	 * Текущий порядок сортировки.
	 *
	 * Если параметр `sort` отсутствует или содержит недопустимое значение,
	 * используется значение по умолчанию — `'desc'`.
	 *
	 * @type {SortOrder}
	 */
	const sortOrder: SortOrder = urlValue === 'asc' || urlValue === 'desc' ? urlValue : 'desc';

	/**
	 * Функция для изменения порядка сортировки.
	 *
	 * Обновляет параметр `sort` в URL. Если передано значение `'desc'`,
	 * параметр удаляется из строки запроса. Используется `{ replace: true }`,
	 * чтобы не засорять историю браузера.
	 *
	 * @param {SortOrder} order - Новое значение сортировки: `'asc'` или `'desc'`.
	 *
	 * @example
	 * setSortOrder('asc'); // URL: ?sort=asc
	 * setSortOrder('desc'); // URL: (без параметра)
	 */
	const setSortOrder = (order: SortOrder) => {
		setSearchParams(
			(params) => {
				if (order === 'desc') {
					params.delete('sort'); // Удаляем параметр по умолчанию
				} else {
					params.set('sort', order);
				}
				return params;
			},
			{ replace: true } // Не добавляем новую запись в историю
		);
	};

	return { sortOrder, setSortOrder };
};
