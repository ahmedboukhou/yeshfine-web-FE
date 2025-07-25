import { memo, useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetPharmacyMedicineDetailQuery } from '../../../apis/patient/pharmacies';
import { MedicineCard } from '../MedicineCard';
import { MedicineDetailsSkeleton } from '../skeletons/MedicineDetailsSkeleton';

type MedicineDetailModalProps = {
	id: string;
	open: boolean;
	onClose: () => void;
};

const MedicineDetailModal: FC<MedicineDetailModalProps> = ({ id, open }) => {
	const { t } = useTranslation();
	const [medicineId, setMedicineId] = useState('');
	const [showCounter, setShowCounter] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const { data, isLoading } = useGetPharmacyMedicineDetailQuery({ id: medicineId });
	const { medicine, popularProducts } = data?.data || {};
	const { medicine_image, name, unit_price, strength, dosage_form } = medicine || {};

	useEffect(() => {
		if (open) {
			setMedicineId(id);
			setShowCounter(false); // reset counter when opening
			setQuantity(1);
		} else {
			setMedicineId('');
		}
	}, [open, id]);

	useEffect(() => {
		if (window.HSStaticMethods?.autoInit) {
			window.HSStaticMethods.autoInit();
		}
	}, []);

	return (
		<div
			id={`hs-${id}`}
			className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none"
			role="dialog"
			tabIndex={-1}
			aria-labelledby={`hs-${id}-label`}
		>
			<div className="sm:max-w-4xl sm:w-full m-3 sm:mx-auto">
				{isLoading ? (
					<MedicineDetailsSkeleton />
				) : (
					<div className=" bg-primary-light py-5 px-4 rounded-2xl pointer-events-auto">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="bg-white rounded-lg flex-center h-120 px-10">
								<img src={medicine_image} alt={name} className=" bg-contain rounded-lg" />
							</div>

							<div className="flex-items-center">
								<div className="space-y-2 w-full">
									<h3 className="font-bold text-typography-700">
										{name} - {strength} {dosage_form}
									</h3>
									<h4 className="text-typography-800 font-medium">MRU {unit_price}</h4>

									<div className="w-full sm:w-xs mt-2">
										{showCounter ? (
											<div className='space-y-2 w-full'>
												<div className="flex items-center space-x-2">
													<button
														className="px-3 py-1 bg-gray-200 rounded-full"
														onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
													>
														-
													</button>
													<span className="font-medium">{quantity}</span>
													<button
														className="px-3 py-1 bg-gray-200 rounded-full"
														onClick={() => setQuantity((prev) => prev + 1)}
													>
														+
													</button>
												</div>
												<button className="primary-btn w-full" onClick={() => setShowCounter(true)}>
													{t('addToCart')}
												</button>
											</div>
										) : (
											<button className="primary-btn w-full" onClick={() => setShowCounter(true)}>
												{t('buyNow')}
											</button>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="border-t border-t-border-1 my-8" />
						<div className="space-y-3">
							<h4 className="font-semibold text-typography-700">{t('popularProducts')}</h4>

							<div className="grid grid-cols-4 gap-4">
								{!!popularProducts?.length ? (
									popularProducts
										?.slice(0, 4)
										?.map(({ id, medicine_image, name, strength, unit_price, dosage_form }) => (
											<MedicineCard
												key={id}
												id={id}
												image={medicine_image}
												name={name}
												strength={strength}
												dosage={dosage_form}
												price={unit_price}
											/>
										))
								) : (
									// TODO: change
									<p className="text-center my-5 col-span-4">No popular products found!</p>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default memo(MedicineDetailModal);
