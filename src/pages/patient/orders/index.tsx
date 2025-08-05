import { useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../../apis/patient/orders';
import { Tabs } from '../../../components/ui/actions/Tabs';
import { SearchInput } from '../../../components/ui/actions/SearchInput';
import { useTranslation } from 'react-i18next';
import { Pagination } from '../../../components/ui/Pagination';

export const PatientOrders = () => {
	const { t } = useTranslation(['common', 'patient']);

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [orderStatus, setOrderStatus] = useState<string>('pending');
	const [paymentStatus, setPaymentStatus] = useState<'paid' | 'not_paid' | ''>('');
	const [shouldRefetch, setShouldRefetch] = useState(false);

	const { data, refetch, isFetching } = useGetOrdersQuery({
		page,
		limit: 6,
		search,
		order_status: orderStatus,
		payment_status: paymentStatus,
	});
	const { meta, orders } = data?.data || {};
	useEffect(() => {
		if (shouldRefetch) {
			refetch();
			setShouldRefetch(false);
		}
	}, [shouldRefetch]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPage(1);
		setSearch(e.target.value);
		setShouldRefetch(true);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		setShouldRefetch(true);
	};

	const tabData = [
		{ label: t('upcoming'), value: 'pending' },
		{ label: t('past'), value: 'completed' },
	];
	console.log('🚀 ~ PatientOrders ~ data:', data);
	return (
		<section>
			<div className="flex-between-center flex-wrap gap-3 mb-5 space-y-2">
				<h3 className="font-semibold text-typography-700">{t('appointments')}</h3>

				<SearchInput onChange={handleSearch} />
			</div>

			<div className="max-w-xs">
				<Tabs
					tabs={tabData.map((tab) => ({
						label: tab.label,
						content: null, // no need for duplicate content
					}))}
					defaultIndex={tabData.findIndex((tab) => tab.value === orderStatus)}
					onChange={(index) => {
						setOrderStatus(tabData[index].value);
						setPage(1);
						setShouldRefetch(true);
					}}
					disabled={isFetching}
				/>
			</div>
			<div className="grid grid-cols-6 gap-5 mb-10">
				{/* {isFetching ? (
					<AppointmentCardSkeleton count={6} />
				) : !!orders?.length ? (
					orders?.map(
						(
							{
								doctor: { image, name, speciality, clinicName },
								appointment_date_formatted,
								time_range,
								appointment_type_label,
								distance,
								appointment_id,
								meeting_link,
							},
							index
						) => (
							<div key={index} className="col-span-6 md:col-span-3 xl:col-span-2">
								<AppointmentCard
									key={index}
									id={appointment_id}
									distance={distance}
									meeting_link={meeting_link}
									image={image}
									label={appointment_type_label}
									name={name}
									meetingButtonDisabled={type === AppointmentFilterTypeEnum.Past}
									specialty={speciality}
									clinicName={clinicName}
									appointmentDate={appointment_date_formatted}
									timeRange={time_range}
								/>
							</div>
						)
					)
				) : (
					<div className="col-span-6 my-4 flex-center">
						<p>{t('notFound', { ns: 'patient', text: t('appointments', { ns: 'common' }) })}</p>
					</div>
				)} */}
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
