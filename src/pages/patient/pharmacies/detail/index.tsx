import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { useGetPharmacyDetailQuery } from '../../../../apis/patient/pharmacies';
import { ClockIcon } from '../../../../assets/icons';
import { Badge } from '../../../../components/ui/Badge';
import { Breadcrumb } from '../../../../components/ui/Breadcrumb';
import { Distance } from '../../../../components/ui/Distance';
import { GoogleMap } from '../../../../components/ui/GoogleMap';
import { LocationInfo } from '../../../../components/ui/LocationInfo';
import { LabDetailSkeleton } from '../../../../components/ui/skeletons/LabDetailSkeleton';
import { PHARMACIES_MEDICINE_CATEGORY_ROUTE, PHARMACIES_ROUTE } from '../../../../routes';
import { MedicineCard } from '../../../../components/ui/MedicineCard';

export const PatientPharmaciesDetail = () => {
	const { t } = useTranslation(['patient', 'common']);
	const { id } = useParams<{ id: string }>();

	const { data, isLoading } = useGetPharmacyDetailQuery({ id });
	const { medicinesByCategory, pharmacy } = data?.data || {};
	const {
		name,
		image,
		latitude,
		longitude,
		address,
		pharmacyDetail,
		distance,
		is_open,
		time_range,
	} = pharmacy || {};
	const {} = pharmacyDetail || {};

	const breadcrumbItems = [
		{ title: t('pharmacies', { ns: 'common' }), path: PHARMACIES_ROUTE },
		{ title: t('pharmacyDetails'), path: '' },
	];

	return (
		<section>
			<Breadcrumb items={breadcrumbItems} />
			{isLoading ? (
				<LabDetailSkeleton />
			) : (
				<Fragment>
					<img src={image} className="h-72 w-full object-cover object-top rounded-2xl" />

					<div className="card mt-6">
						<div className="space-y-3">
							<div className="flex-items-center gap-2">
								<h3 className="font-semibold text-typography-900">{name}</h3>
								<Distance distance={distance} />
							</div>

							<div className="flex-items-center gap-2">
								<span className={`!text-xs ${is_open ? 'text-primary' : 'text-typography-500'}`}>
									{t(is_open ? 'open' : 'closed', { ns: 'common' })}
								</span>
								<Badge icon={<ClockIcon />} specialty={time_range} variant="primary" />
							</div>

							<LocationInfo address={address} />
							<div className="h-60 mt-5 mb-5">
								<GoogleMap latitude={latitude} longitude={longitude} />
							</div>
						</div>

						<div>
							{medicinesByCategory &&
								Object.entries(medicinesByCategory)
									?.slice(0, 5)
									?.map(([category, medicines]) => (
										<div key={category} className="mt-6">
											<div className="flex-between-center">
												<h4 className="font-semibold text-lg mb-3 capitalize text-typography-800">
													{category}
												</h4>
												<Link
													to={`${PHARMACIES_MEDICINE_CATEGORY_ROUTE.replace(
														':id',
														`${id}`
													)}?category=${category}`}
													className="text-primary font-medium hover:underline text-nowrap"
												>
													{t('seeAll', { ns: 'common' })}
												</Link>
											</div>
											<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
												{medicines?.map(
													({ dosage_form, id, medicine_image, name, strength, unit_price }) => (
														<div key={id}>
															<MedicineCard
																id={id}
																image={medicine_image}
																name={name}
																strength={strength}
																dosage={dosage_form}
																price={unit_price}
															/>
														</div>
													)
												)}
											</div>
										</div>
									))}
						</div>
					</div>
				</Fragment>
			)}
		</section>
	);
};
