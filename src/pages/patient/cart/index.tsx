import { useTranslation } from 'react-i18next';
import { useCreateOrderMutation, useGetCartItemsQuery } from '../../../apis/patient/pharmacies';
import { CartCard } from '../../../components/ui/cards/CartCard';
import { CartSkeleton } from '../../../components/ui/skeletons/CartSkeleton';
import { useEffect, useState } from 'react';
import { CartEmpty } from './Empty';
import { DropZone } from '../../../components/ui/dropzone';
import type { FileWithPath } from 'react-dropzone';
import infoIcon from '../../../assets/icons/info-circle.svg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { ORDERS_ROUTE } from '../../../routes';

export const PatientCart = () => {
	const { t } = useTranslation(['patient', 'common']);
	const navigate = useNavigate();
	const [cartDeleted, setCartDeleted] = useState(false);
	const { data, isFetching } = useGetCartItemsQuery();
	const { carts, total_amount } = data?.data || {};
	const [totalAmount, setTotalAmount] = useState(total_amount);
	const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);

	const { mutateAsync: createOrder, isPending } = useCreateOrderMutation();

	const handleCreateOrder = () => {
		const formData = new FormData();

		if (uploadedFiles.length > 0) {
			formData.append('file', uploadedFiles[0]);
		}

		createOrder(formData, {
			onSuccess: ({ message }) => {
				toast.success(message);
				navigate(ORDERS_ROUTE);
			},
		});
	};

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
								<div>
									<h4 className="font-bold text-typography-800">{t('uploadPrescription')}</h4>
									<span className="font-medium text-typography-600">
										{t('prescriptionRequiredInfo')}
									</span>
									<div className="flex gap-1 mb-4 space-y-3">
										<div className="shrink-0">
											<img
												src={infoIcon}
												alt="info-icon"
												className="bg-primary-light-hover rounded-full p-2"
											/>
										</div>
										<span className="text-primary">
											{t('prescriptionSkipNote')} {t('prescriptionSkipNote')}
										</span>
									</div>
									<DropZone files={uploadedFiles} setFiles={setUploadedFiles} />
								</div>

								<div className="card flex-between-center">
									<div>
										<span>{t('total')}</span>
										<p className="font-semibold">MRU {totalAmount}</p>
									</div>
									<div>
										<button
											onClick={handleCreateOrder}
											className="primary-btn"
											disabled={isPending}
										>
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
