import { useTranslation } from 'react-i18next';
import { useGetCartItemsQuery } from '../../../apis/patient/pharmacies';
import { CartCard } from '../../../components/ui/cards/CartCard';
import { CartSkeleton } from '../../../components/ui/skeletons/CartSkeleton';

export const PatientCart = () => {
	const { t } = useTranslation(['patient', 'common']);
	const { data, isFetching } = useGetCartItemsQuery();
	const { carts, total_amount } = data?.data || {};
	return (
		<section>
			<div className="mb-6">
				<h3 className="font-semibold text-typography-700">{t('myCart')}</h3>
			</div>
			{isFetching ? (
				<CartSkeleton />
			) : (
				<div className="card">
					{!!carts?.length ? (
						carts.map(({ cart_id, pharmacy, items }) => (
							<div key={cart_id} className="space-y-8 ">
								<h3 className="font-semibold mb-2 text-typography-800">{pharmacy.name}</h3>

								<div className="space-y-2 mt-3">
									{items.map(
										({
											medicine: { medicine_image, name, dosage_form, strength },
											id,
											subtotal,
											quantity,
										}) => (
											<CartCard
												key={id}
												id={id}
												dosageForm={dosage_form}
												strength={strength}
												name={name}
												image={medicine_image}
												quantity={quantity}
												unitPrice={subtotal}
											/>
										)
									)}
								</div>

								<div className="card flex-between-center">
									<div>
										<span>{t('total')}</span>
										<p className="font-semibold">MRU {total_amount}</p>
									</div>
									<div>
										<button disabled className="primary-btn">
											{t('payNow', { ns: 'common' })}
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<p>No items in your cart.</p>
					)}
				</div>
			)}
		</section>
	);
};
