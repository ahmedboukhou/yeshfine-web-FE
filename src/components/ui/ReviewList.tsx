import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GreenDownArrowIcon } from '../../assets/icons';
import type { DoctorReviewType } from '../../interfaces';
import type { DoctorReviewsResponse } from '../../interfaces/responseTypes';
import { getRelativeTimeString } from '../../lib/dayjs';
import { ReviewRating } from './ReviewRating';
import { DoctorReviewsSkeleton } from './skeletons/DoctorReviewsSkeleton';

type ReviewListProps = {
	id?: string;
	useReviewQuery: (params: { id?: string; page: number; limit: number }) => {
		data?: DoctorReviewsResponse;
		isLoading: boolean;
	};
	limit?: number;
	extractReviews?: (data?: DoctorReviewsResponse) => {
		reviews?: DoctorReviewType[];
		meta?: { hasMore: boolean };
	};
};

export const ReviewList = ({
	id,
	useReviewQuery,
	limit = 4,
	extractReviews = (data) => {
		const { items, meta } = data?.data || {};
		const { reviews } = items || {};
		return { reviews, meta };
	},
}: ReviewListProps) => {
	const { t } = useTranslation();
	const [page, setPage] = useState(1);
	const [allReviews, setAllReviews] = useState<DoctorReviewType[]>([]);

	const { data, isLoading } = useReviewQuery({ id, page, limit });
	const { reviews = [], meta } = extractReviews(data);

	useEffect(() => {
		if (reviews?.length > 0) {
			setAllReviews((prev) => (page === 1 ? reviews : [...prev, ...reviews]));
		}
	}, [reviews, data, page]);

	const handleViewMore = () => setPage((prev) => prev + 1);

	if (isLoading && page === 1) return <DoctorReviewsSkeleton />;

	return (
		<section>
			{!allReviews.length ? (
				<p className="text-center font-medium">{t('noReviews')}</p>
			) : (
				allReviews.map(({ created_at, rating, review_text, user: { name, image } }, index) => (
					<div className="flex py-3 gap-3" key={index}>
						<div>
							<img className="inline-block size-12 rounded-2xl object-top" src={image} alt={name} />
						</div>
						<div className="flex-1">
							<div className="flex-between">
								<span className="font-semibold text-typography-700">{name}</span>
								<span className="font-medium text-typography-500">
									{getRelativeTimeString(created_at)}
								</span>
							</div>

							<div className="flex-items-center gap-1">
								<ReviewRating rating={+rating} />
								<span className="!text-xs text-typography-500">{rating}</span>
							</div>

							<span className="text-typography-500">{review_text}</span>
						</div>
					</div>
				))
			)}

			{isLoading && page > 1 && <DoctorReviewsSkeleton />}

			{meta?.hasMore && !isLoading && (
				<div className="mt-4 flex-center">
					<button className="link-text !no-underline flex gap-2" onClick={handleViewMore}>
						<span className="text-primary font-semibold">{t('viewMore')}</span>
						<GreenDownArrowIcon />
					</button>
				</div>
			)}
		</section>
	);
};
