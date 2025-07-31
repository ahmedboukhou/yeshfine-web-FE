import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { useUpdateCartItemQuantityMutation } from '../../../apis/patient/pharmacies';
import { GrayAddIcon, GrayBinIcon, RedBinIcon } from '../../../assets/icons';

type CartCardProps = {
	id: number;
	name: string;
	image: string;
	strength: string;
	dosageForm: string;
	quantity: number;
	availableStock: number;
	setCartDeleted: Dispatch<SetStateAction<boolean>>;
	setTotalAmount: Dispatch<SetStateAction<number | undefined>>;
	subtotal: number;
};
export const CartCard: FC<CartCardProps> = ({
	image,
	name,
	subtotal,
	dosageForm,
	strength,
	quantity,
	id,
	setCartDeleted,
	setTotalAmount,
}) => {
	const [localQuantity, setLocalQuantity] = useState(quantity);
	const [localSubtotal, setLocalSubtotal] = useState(subtotal);
	const [isRemoved, setIsRemoved] = useState(false);

	const { mutateAsync, isPending } = useUpdateCartItemQuantityMutation();

	const handleQuantityChange = (newQty: number) => {
		if (isPending) return;
		setLocalQuantity(newQty);

		mutateAsync(
			{ cart_item_id: id, quantity: newQty },
			{
				onSuccess: ({ data }) => {
					setCartDeleted(data.cart_deleted);
					setIsRemoved(data.item_removed);
					setTotalAmount(data.cart_total);
					setLocalSubtotal(data.item_subtotal);
				},
				onError: () => {
					setLocalQuantity((prev) => prev);
				},
			}
		);
	};
	// If the item is removed, we don't render it
	if (isRemoved) return null;
	return (
		<div className="flex-items-center gap-2 border border-border-1 rounded-xl">
			<div>
				<img
					src={image}
					alt={name}
					className="rounded-l-xl w-32 h-40 sm:h-32 object-cover object-top"
				/>
			</div>
			<div className="flex-1 p-4 space-y-1">
				<div className="flex-between">
					<p className="text-typography-700 font-semibold">{name}</p>
					<div className="cursor-pointer" onClick={() => handleQuantityChange(0)}>
						<RedBinIcon />
					</div>
				</div>

				<span className="text-typography-700">
					{strength} {dosageForm}
				</span>

				<div className="flex-between mt-2 flex-col sm:flex-row gap-2">
					<div className="flex-items-center gap-3">
						<button
							disabled={isPending || localQuantity <= 1}
							onClick={() => handleQuantityChange(localQuantity - 1)}
							className="p-0.5 hover:bg-gray-200 bg-gray-100 rounded-full cursor-pointer border border-border-1 disabled:opacity-50 disabled:pointer-events-none"
						>
							<GrayBinIcon />
						</button>
						<p className="font-semibold text-typography-800">{localQuantity}</p>
						<button
							disabled={isPending}
							onClick={() => handleQuantityChange(localQuantity + 1)}
							className="p-0.5 hover:bg-gray-200 bg-gray-100 rounded-full cursor-pointer border border-border-1 disabled:opacity-50 disabled:pointer-events-none"
						>
							<GrayAddIcon />
						</button>
					</div>
					{isPending ? (
						<div className="animate-pulse">
							<div className="h-8 w-30 bg-gray-300 rounded" />
						</div>
					) : (
						<p className="text-typography-700 font-semibold">MRU {localSubtotal}</p>
					)}
				</div>
			</div>
		</div>
	);
};
