import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
	useAddToCartMutation,
	useGetPharmacyMedicineDetailQuery,
} from '../../../../../apis/patient/pharmacies';
import { MedicineCard } from '../../../../../components/ui/MedicineCard';
import { MedicineDetailCardSkeleton } from '../../../../../components/ui/skeletons/MedicineDetailsSkeleton';
import { CART_ROUTE } from '../../../../../routes';
import { BinIcon, PlusIcon } from '../../../../../assets/icons';

export const PatientMedicineDetails = () => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [showCounter, setShowCounter] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const { data, isLoading } = useGetPharmacyMedicineDetailQuery({ id });

	const { mutateAsync: addToCartItemQuantity, isPending } = useAddToCartMutation();
	const { medicine, popularProducts } = data?.data || {};
	const { medicine_image, name, unit_price, strength, dosage_form } = medicine || {};

	const handleAddToCart = () => {
		addToCartItemQuantity(
			{ medicine_id: id, quantity },
			{
				onSuccess: () => {
					navigate(CART_ROUTE);
					setShowCounter(false);
				},
				onError: ({ message }) => {
					toast.error(message || 'Failed to add item to cart');
				},
			}
		);
	};

	return isLoading ? (
		<MedicineDetailCardSkeleton />
	) : (
		<div className="py-5 px-4 rounded-2xl pointer-events-auto card">
			<div className="grid grid-cols-12 gap-4">
				<div className="rounded-lg flex-center h-120 px-10 bg-gray-200 col-span-12 sm:col-span-7">
					<img src={medicine_image} alt={name} className=" bg-contain rounded-lg" />
				</div>

				<div className="flex-items-center col-span-12 sm:col-span-5">
					<div className="space-y-2 w-full">
						<h3 className="font-bold text-typography-700">
							{name} - {strength} {dosage_form}
						</h3>
						<h4 className="text-typography-800 font-medium">MRU {unit_price}</h4>

						<div>
							{showCounter ? (
								<div className="space-y-2 w-full md:max-w-xs">
									<div className="flex-between-center gap-2 border-2 border-primary py-2 px-3 rounded-lg">
										<div
											className="cursor-pointer"
											onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
										>
											<BinIcon />
										</div>
										<span className="font-bold text-primary">{quantity}</span>

										<div className="cursor-pointer" onClick={() => setQuantity((prev) => prev + 1)}>
											<PlusIcon />
										</div>
									</div>
									<button
										className="primary-btn w-full"
										disabled={isPending}
										onClick={handleAddToCart}
									>
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
						<p className="text-center my-5 col-span-4">No popular products found!</p>
					)}
				</div>
			</div>
		</div>
	);
};
