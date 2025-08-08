import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { CalendarIcon, ClockIcon, LocationIcon } from '../../../assets/icons';
import { PaymentStatusEnum } from '../../../interfaces/enums';
import { ORDERS_DETAIL_ROUTE } from '../../../routes';
import { Badge } from '../Badge';
import { Distance } from '../Distance';

type OrdersCardProps = {
	distance: number | null;
	pharmacyName: string;
	pharmacyImage: string;
	pharmacyAddress: string;
	paymentStatus: PaymentStatusEnum;
	totalAmount: number;
	orderId: number;
	isOpen: boolean;
	timeRange: string;
	orderDate: string;
};
export const OrdersCard: FC<OrdersCardProps> = ({
	isOpen,
	paymentStatus,
	pharmacyAddress,
	pharmacyImage,
	pharmacyName,
	totalAmount,
	orderDate,
	distance,
	timeRange,
	orderId,
}) => {
	const { t } = useTranslation(['patient', 'common']);

	return (
		<Link
			to={ORDERS_DETAIL_ROUTE.replace(':id', `${orderId}`)}
			className="col-span-12 md:col-span-6 xl:col-span-4"
		>
			<div className="p-4 bg-white rounded-2xl border border-border-1">
				<div className="flex gap-2 mb-5">
					<img src={pharmacyImage} alt={pharmacyName} className="w-20 h-20 rounded-xl" />
					<div className="flex-1 space-y-1">
						<div className="flex-between">
							<h5 className="line-clamp-1 font-semibold text-typography-800">{pharmacyName}</h5>
							<Distance distance={distance} />
						</div>

						<div className="gap-2 flex-items-center">
							<LocationIcon />
							<span className="text-typography-700">{pharmacyAddress}</span>
						</div>

						<div className="flex-items-center gap-1">
							<small className={`${isOpen ? 'text-primary' : 'text-typography-500'}`}>
								{t(isOpen ? 'open' : 'closed', { ns: 'common' })}
							</small>

							<Badge icon={<ClockIcon />} specialty={timeRange} variant="primary" />
						</div>
					</div>
				</div>
				<div className="border-t border-border-1 my-2" />

				<div className="flex-between mb-3">
					<span className="text-typography-800">
						Order# <span className="font-bold">{orderId}</span>
					</span>

					<div className="flex gap-1">
						<CalendarIcon />
						<span>{orderDate}</span>
					</div>
				</div>

				<div className="flex-between">
					<Badge
						specialty={paymentStatus}
						variant={paymentStatus === PaymentStatusEnum.NotPaid ? 'warning' : 'primary'}
					/>
					<p className="text-primary font-bold">MRU {totalAmount}</p>
				</div>
			</div>
		</Link>
	);
};
