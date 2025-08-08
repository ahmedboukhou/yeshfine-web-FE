import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetOrdersQuery } from '../../../apis/patient/orders';
import { Pagination } from '../../../components/ui/Pagination';
import { SearchInput } from '../../../components/ui/actions/SearchInput';
import { Tabs } from '../../../components/ui/actions/Tabs';
import { OrdersCard } from '../../../components/ui/cards/OrdersCard';
import { OrdersCardSkeleton } from '../../../components/ui/skeletons/OrdersCardSkeleton';

export const PatientOrders = () => {
	const { t } = useTranslation(['common', 'patient']);

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [orderStatus, setOrderStatus] = useState<string>('pending');
	const [paymentStatus] = useState<'paid' | 'not_paid' | ''>('');
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
				{isFetching ? (
					<OrdersCardSkeleton count={6} />
				) : !!orders?.length ? (
					orders?.map(
						({
							distance,
							pharmacy_name,
							pharmacy_image,
							pharmacy_address,
							payment_status,
							total_amount,
							order_id,
							is_open,
							order_date,
							time_range,
						}) => (
							<div key={order_id} className="col-span-6 md:col-span-3 xl:col-span-2">
								<OrdersCard
									key={order_id}
									distance={distance}
									pharmacyName={pharmacy_name}
									pharmacyImage={pharmacy_image}
									pharmacyAddress={pharmacy_address}
									paymentStatus={payment_status}
									totalAmount={total_amount}
									orderId={order_id}
									isOpen={is_open}
									timeRange={time_range}
									orderDate={order_date}
								/>
							</div>
						)
					)
				) : (
					<div className="col-span-6 my-4 flex-center">
						<p>{t('notFound', { ns: 'patient', text: t('orders', { ns: 'common' }) })}</p>
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
