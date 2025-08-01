import { useTranslation } from 'react-i18next';
import { useGetCartItemsQuery } from '../../../apis/patient/pharmacies';
import { CartCard } from '../../../components/ui/cards/CartCard';
import { CartSkeleton } from '../../../components/ui/skeletons/CartSkeleton';
import { useEffect, useState } from 'react';
import { CartEmpty } from './Empty';

export const PatientCart = () => {
	const { t } = useTranslation(['patient', 'common']);

	const [cartDeleted, setCartDeleted] = useState(false);
	const { data, isFetching } = useGetCartItemsQuery();
	const { carts, total_amount } = data?.data || {};
	const [totalAmount, setTotalAmount] = useState(total_amount);

	useEffect(() => {
		total_amount && setTotalAmount(total_amount);
	}, [total_amount]);
	
	return (
		<section>
			<div className="mb-6">
				<h3 className="font-semibold text-typography-700">{t('myCart')}</h3>
			</div>
			{isFetching ? (
				<CartSkeleton />
			) : (
				<div className="card">
					{!cartDeleted && !!carts?.length ? (
						carts?.map(({ cart_id, pharmacy, items }) => (
							<div key={cart_id} className="space-y-8 ">
								<h3 className="font-semibold mb-2 text-typography-800">{pharmacy.name}</h3>

								<div className="space-y-2 mt-3">
									{items.map(
										({
											medicine: { medicine_image, name, dosage_form, strength, available_stock },
											id,
											subtotal,
											quantity,
										}) => (
											<CartCard
												key={id}
												id={id}
												setTotalAmount={setTotalAmount}
												availableStock={available_stock}
												dosageForm={dosage_form}
												strength={strength}
												name={name}
												image={medicine_image}
												quantity={quantity}
												subtotal={subtotal}
												setCartDeleted={setCartDeleted}
											/>
										)
									)}
								</div>

								<div className="card flex-between-center">
									<div>
										<span>{t('total')}</span>
										<p className="font-semibold">MRU {totalAmount}</p>
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
						<CartEmpty />
					)}
				</div>
			)}
		</section>
	);
};
