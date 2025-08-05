import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetLabReportsQuery } from '../../../../apis/patient/labs';
import { LabReportCard } from '../../../../components/ui/cards/LabReportCard';
import { LabStatusEnum } from '../../../../interfaces/enums';
import { Pagination } from '../../../../components/ui/Pagination';
import { LabReportCardSkeleton } from '../../../../components/ui/skeletons/LabReportCardSkeleton';
import { Select } from '../../../../components/ui/actions/Select';

export const PatientLabReports = () => {
	const { t } = useTranslation();

	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState<LabStatusEnum | ''>('');
	const { data, isFetching } = useGetLabReportsQuery({ page, limit: 6, filter });
	const { items, meta } = data?.data || {};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};
	const enumMap = {
		[LabStatusEnum.Paid]: 'paid',
		[LabStatusEnum.Pending]: 'pending',
		[LabStatusEnum.Uploaded]: 'uploaded',
	};

	return (
		<section>
			<div className="flex-end mb-6">
				<Select
					id="lab-filter"
					name="lab-filter"
					value={filter}
					disabled={isFetching}
					options={Object.values(LabStatusEnum)}
					enumMap={enumMap}
					onChange={(val) => {
						setFilter(val);
						setPage(1);
					}}
				/>
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
