import { Fragment, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { useGetLabDetailQuery, useGetLabReviewsQuery } from '../../../../apis/patient/labs';
import {
	BookAppointmentIcon,
	ClockIcon,
	RadioIcon,
	RadioIconFilled,
} from '../../../../assets/icons';
import { SearchInput } from '../../../../components/ui/actions/SearchInput';
import { Breadcrumb } from '../../../../components/ui/Breadcrumb';
import { GoogleMap } from '../../../../components/ui/GoogleMap';
import { Rating } from '../../../../components/ui/Rating';
import { ReviewList } from '../../../../components/ui/ReviewList';
import { LabDetailSkeleton } from '../../../../components/ui/skeletons/LabDetailSkeleton';
import type { LabServiceType } from '../../../../interfaces/responseTypes';
import { LAB_BOOK_APPOINTMENT_ROUTE, LABS_ROUTE } from '../../../../routes';

export const PatientLabDetail = () => {
	const { t } = useTranslation(['patient', 'common']);
	const { id } = useParams<{ id: string }>();

	const [search, setSearch] = useState('');
	const [selectedTest, setSelectedTest] = useState<LabServiceType | null>(null);

	const { data, isLoading } = useGetLabDetailQuery({ id });
	const { image, name, labDetail, address, latitude, longitude } = data?.data?.lab || {};
	const { average_rating, servicesList, total_reviews, id: labDetailId } = labDetail || {};
	const breadcrumbItems = [
		{ title: t('labs', { ns: 'common' }), path: LABS_ROUTE },
		{ title: t('details', { ns: 'common' }), path: '' },
	];

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

	useEffect(() => {
		if (servicesList?.length && !selectedTest) {
			setSelectedTest(servicesList[0]);
		}
	}, [servicesList, selectedTest]);

	const handleTestSelect = (test: LabServiceType) => {
		setSelectedTest(test);
	};

	const filteredServices = useMemo(() => {
		if (!search) return servicesList;
		return servicesList?.filter((service) =>
			service.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [search, servicesList]);

	return (
		<section>
			<Breadcrumb items={breadcrumbItems} />
			{isLoading ? (
				<LabDetailSkeleton />
			) : (
				<Fragment>
					<img src={image} className="h-72 w-full object-cover object-top rounded-2xl" />

					<div className="card mt-6">
						<div className="flex-between flex-col sm:flex-row">
							<div className="flex-items-center gap-4 pt-4">
								<h3 className="font-semibold text-typography-900">{name}</h3>
								<Rating rating={average_rating} />
							</div>
							<div>
								<Link
									to={{
										pathname: LAB_BOOK_APPOINTMENT_ROUTE.replace(':id', `${id}`),
									}}
									state={{ selectedTest, latitude, longitude, address, labDetailId }}
									className="primary-btn w-full mt-6 flex-center gap-2 text-sm font-semibold"
								>
									<BookAppointmentIcon />
									{t('bookAppointment')}
								</Link>
							</div>
						</div>

						<div className="mt-6">
							<h5 className="font-semibold text-typography-800">
								{t('location', { ns: 'common' })}
							</h5>
							<p className="text-typography-500 font-medium">{address}</p>

							<div className="h-60 mt-5 mb-5">
								<GoogleMap latitude={latitude} longitude={longitude} />
							</div>
							<div className="mb-6">
								<h5 className="mb-4 font-semibold text-typography-800">
									{t('tests', { ns: 'common' })}
								</h5>
								<SearchInput onChange={handleSearch} />
							</div>
							{/* lab test card */}
							<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 cursor-pointer">
								{!!filteredServices?.length ? (
									filteredServices?.map((test, index) => {
										const isSelected = selectedTest?.name === test.name;
										return (
											<div
												key={index}
												onClick={() => handleTestSelect(test)}
												className={`p-3 bg-white rounded-lg col-span-1 card-box-shadow-2 ${
													isSelected ? 'card-gradient' : ''
												}`}
											>
												<div className="flex-items-center gap-1">
													<span className="text-typography-700 font-semibold ellipses flex-1">
														{test.name}
													</span>
													<div>{isSelected ? <RadioIconFilled /> : <RadioIcon />}</div>
												</div>
												<div className="mb-3 flex mt-1">
													<span className="text-typography-500 font-semibold !text-xs ellipses">
														{test.description}
													</span>
												</div>

												<div className="flex-between flex-wrap">
													<div className="flex-items-center gap-1">
														<ClockIcon />

														<span className="text-typography-500 font-semibold !text-xs">
															{t('resultTime', { ns: 'common' })}:
															<span className="font-bold !text-xs">{test.result_time_in_days}</span>
														</span>
													</div>

													<span className="text-primary font-semibold">MRU {test.price}</span>
												</div>
											</div>
										);
									})
								) : (
									<p className=" text-center">
										{t('notFound', { ns: 'patient', text: t('tests', { ns: 'common' }) })}
									</p>
								)}
							</div>

							<div className="mt-8">
								{isLoading ? (
									<div className="h-5 w-40 bg-gray-200 rounded mb-3" />
								) : (
									<h5 className="mb-3 font-semibold text-typography-800">
										{t('rating')} ({total_reviews})
									</h5>
								)}
								<ReviewList id={id} useReviewQuery={useGetLabReviewsQuery} limit={4} />
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</section>
	);
};
