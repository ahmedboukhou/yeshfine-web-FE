import { useTranslation } from 'react-i18next';
import { PaginationBackIcon, PaginationNextIcon } from '../../assets/icons';
import { PaginationSkeleton } from './skeletons/PaginationSkeleton';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isLoading?: boolean;
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	isLoading = false,
}: PaginationProps) => {
	const { t } = useTranslation();

	const handlePrevious = () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1);
	};

	const getPageNumbers = () => {
		const maxVisible = window.innerWidth < 640 ? 2 : 6;
		const pages: (number | string)[] = [];

		if (totalPages <= maxVisible + 2) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			const left = Math.max(2, currentPage - Math.floor(maxVisible / 2));
			const right = Math.min(totalPages - 1, currentPage + Math.floor(maxVisible / 2));

			pages.push(1);
			if (left > 2) pages.push('...');
			for (let i = left; i <= right; i++) pages.push(i);
			if (right < totalPages - 1) pages.push('...');
			pages.push(totalPages);
		}

		return pages;
	};

	return isLoading ? (
		<PaginationSkeleton />
	) : (
		<nav
			className="flex justify-between items-center gap-x-1 pt-5 border-t border-t-border-1"
			aria-label="Pagination"
		>
			<button
				className="pagination-btn"
				onClick={handlePrevious}
				disabled={isLoading || currentPage === 1}
			>
				<PaginationBackIcon />
				<span aria-hidden="true" className="hidden sm:block">
					{t('previous')}
				</span>
			</button>

			<div className="flex items-center gap-x-1">
				{getPageNumbers().map((page, idx) =>
					page === '...' ? (
						<span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
							...
						</span>
					) : (
						<button
							key={page}
							disabled={isLoading}
							className={`min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-hidden ${
								page === currentPage
									? 'bg-primary text-white'
									: 'cursor-pointer text-gray-800 hover:bg-gray-100'
							}`}
							onClick={() => onPageChange(page as number)}
						>
							{page}
						</button>
					)
				)}
			</div>

			<button
				className="pagination-btn"
				onClick={handleNext}
				disabled={isLoading || currentPage === totalPages}
			>
				<span aria-hidden="true" className="hidden sm:block">
					{t('next')}
				</span>
				<PaginationNextIcon />
			</button>
		</nav>
	);
};
