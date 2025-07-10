import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useGetDoctorReviewsQuery } from '../../../../apis/patient/doctors';
import { ReviewRating } from '../../../../components/ui/ReviewRating';
import { getRelativeTimeString } from '../../../../lib/dayjs';
import { GreenDownArrowIcon } from '../../../../assets/icons';
import { DoctorReviewsSkeleton } from '../../../../components/ui/skeletons/DoctorReviewsSkeleton';
import type { DoctorReviewType } from '../../../../interfaces';

export const DoctorRating = () => {
	const { id } = useParams();
	const { t } = useTranslation();

	const [page, setPage] = useState(1);
	const [allReviews, setAllReviews] = useState<DoctorReviewType[]>([]);
	const [hasMore, setHasMore] = useState(true);

	const { data, isLoading } = useGetDoctorReviewsQuery({ id, page, limit: 2 });
	const { reviews } = data?.data?.items || {};

	// Append reviews on page change
	useEffect(() => {
		if (reviews && reviews.length > 0) {
			setAllReviews((prev) => (page === 1 ? reviews : [...prev, ...reviews]));
		} else if (reviews && reviews.length === 0) {
			setHasMore(false);
		}
	}, [reviews, data, page]);

	const handleViewMore = () => setPage((prev) => prev + 1);

	return isLoading && page === 1 ? (
		<DoctorReviewsSkeleton />
	) : (
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
							<div className="flex-between-center gap-3">
								<span className="font-semibold text-typography-700">{name}</span>
								<span className="font-medium text-typography-500">
									{getRelativeTimeString(created_at)}
								</span>
							</div>

							<div className="flex-items-center gap-1">
								<ReviewRating rating={+rating} />
								<span className="text-xs text-typography-500">{rating}</span>
							</div>

							<span className="text-xs text-typography-500">{review_text}</span>
						</div>
					</div>
				))
			)}
			{isLoading && page > 1 && <DoctorReviewsSkeleton />}

			{hasMore && !isLoading && (
				<div className="mt-4 flex-center">
					<button className="link-text !no-underline" onClick={handleViewMore}>
						<span className="text-primary font-semibold">{t('viewMore')}</span>
						<GreenDownArrowIcon />
					</button>
				</div>
			)}
		</section>
	);
};
