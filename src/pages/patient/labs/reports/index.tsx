import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetLabReportsQuery } from '../../../../apis/patient/labs';
import { LabReportCard } from '../../../../components/ui/cards/LabReportCard';
import { LabStatusEnum } from '../../../../interfaces/enums';
import { Pagination } from '../../../../components/ui/Pagination';
import { LabReportCardSkeleton } from '../../../../components/ui/skeletons/LabReportCardSkeleton';
import { Select } from 'react-day-picker';

export const PatientLabReports = () => {
	const { t } = useTranslation();

	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState<LabStatusEnum | ''>('');
	const { data, isFetching } = useGetLabReportsQuery({ page, limit: 6, filter });
	const { items, meta } = data?.data || {};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};
	return (
		<section>
			<div className="flex-end mb-6">
				{/* TODO: make it separate */}
				<Select
					id="lab-filter"
					name="lab-filter"
					onChange={(e) => {
						setFilter(e.target.value as LabStatusEnum);
						setPage(1);
					}}
					className="cursor-pointer text-typography-700 focus:ring-0 hover:border-primary focus:border-primary-active rounded-xl border-none"
				>
					<option className="option" value="">
						{t('all')}
					</option>
					<option className="option" value={LabStatusEnum.Paid}>
						{t('paid')}
					</option>
					<option className="option" value={LabStatusEnum.Pending}>
						{t('pending')}
					</option>
					<option className="option" value={LabStatusEnum.Uploaded}>
						{t('uploaded')}
					</option>
				</Select>
			</div>
			<div className="grid grid-cols-12 gap-5 mb-10">
				{isFetching ? (
					<LabReportCardSkeleton count={6} />
				) : !!items?.length ? (
					items?.map(
						({
							report_status,
							appointment_date,
							appointment_id,
							lab: { address, image, distance, isOpen, name, timeRange, latitude, longitude },
						}) => (
							<LabReportCard
								address={address}
								appointment_date={appointment_date}
								distance={distance}
								isOpen={isOpen}
								name={name}
								image={image}
								id={appointment_id}
								timeRange={timeRange}
								latitude={latitude}
								longitude={longitude}
								reportStatus={report_status}
							/>
						)
					)
				) : (
					<div className="col-span-12 my-4 flex-center">
						<p>{t('notFound', { ns: 'patient', text: t('reports', { ns: 'common' }) })}</p>
					</div>
				)}
			</div>

			<Pagination
				currentPage={page}
				totalPages={meta?.totalPages || 1}
				onPageChange={handlePageChange}
				isLoading={isFetching}
			/>
		</section>
	);
};
