import type { SortOrder } from '@/shared/types';
import style from './SortPanel.module.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';

type SortPanelProps = {
	label: string;
	sortOrder: SortOrder;
	setSortOrder: (sortOrder: SortOrder) => void;
};

export const SortPanel = ({ label, sortOrder, setSortOrder }: SortPanelProps) => {
	const handleChange = (value: SortOrder) => {
		setSortOrder(value);
	};

	return (
		<div className={style.controls}>
			<label>{label}: &nbsp;</label>
			<Select value={sortOrder} onValueChange={handleChange}>
				<SelectTrigger className='w-45'>
					<SelectValue placeholder='Выберите сортировку' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='desc'>Сначала новые</SelectItem>
						<SelectItem value='asc'>Сначала старые</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
