import style from './SortPanel.module.css';

type SortOrder = 'asc' | 'desc';

type SortPanelProps = {
	label: string;
	sortOrder: SortOrder;
	setSortOrder: (sortOrder: SortOrder) => void;
};

export const SortPanel = ({ label, sortOrder, setSortOrder }: SortPanelProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		if (value === 'asc' || value === 'desc') {
			setSortOrder(value);
		}
	};

	return (
		<div className={style.controls}>
			<label>
				{label}: &nbsp;
				<select value={sortOrder} onChange={handleChange} className={style.select}>
					<option value='desc'>Сначала новые</option>
					<option value='asc'>Сначала старые</option>
				</select>
			</label>
		</div>
	);
};
