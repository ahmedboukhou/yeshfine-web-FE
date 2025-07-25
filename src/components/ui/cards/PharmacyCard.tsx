import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ClockIcon, LocationIcon } from '../../../assets/icons';
import type { Medicine } from '../../../interfaces';
import { Badge } from '../Badge';
import { Distance } from '../Distance';
import { MedicineCard } from '../MedicineCard';

type PharmacyCardProps = {
	name: string;
	image: string;
	address: string;
	distance: number | null;
	open?: boolean;
	link: string;
	timeRange: string;
	medicines: Medicine[];
};
export const PharmacyCard: FC<PharmacyCardProps> = ({
	name,
	image,
	address,
	distance,
	open,
	timeRange,
	link,
	medicines,
}) => {
	const { t } = useTranslation(['patient', 'common']);

	return (
		<div className="col-span-12 md:col-span-6 xl:col-span-4">
			<div className="p-4 bg-white rounded-2xl border border-border-1">
				<Link to={link} className="flex gap-2 mb-5">
					<img src={image} alt={name} className="w-20 h-20 rounded-xl" />
					<div className="flex-1 space-y-1">
						<div className="flex-between">
							<h5 className="line-clamp-1 font-semibold text-typography-800">{name}</h5>
							<Distance distance={distance} />
						</div>

						<div className="gap-2 flex-items-center">
							<LocationIcon />
							<span className="text-typography-700">{address}</span>
						</div>

						<div className="flex-items-center gap-1">
							<small className={`${open ? 'text-primary' : 'text-typography-500'}`}>
								{t(open ? 'open' : 'closed', { ns: 'common' })}
							</small>

							<Badge icon={<ClockIcon />} specialty={timeRange} variant="primary" />
						</div>
					</div>
				</Link>

				<div className="grid grid-cols-3 gap-2">
					{!!medicines?.length ? (
						medicines
							?.slice(0, 3)
							.map(({ name, strength, unit_price, medicine_image, id, dosage_form }) => (
								<div className="col-span-1" key={id}>
									<MedicineCard
										id={id}
										image={medicine_image}
										name={name}
										strength={strength}
										dosage={dosage_form}
										price={unit_price}
									/>
								</div>
							))
					) : (
						<div className="col-span-3 text-center h-55 flex-center">
							<p>{t('notFound', { ns: 'patient', text: t('medicines', { ns: 'common' }) })}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
