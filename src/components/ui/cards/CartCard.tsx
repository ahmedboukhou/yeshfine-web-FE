import type { FC } from 'react';
import { GrayAddIcon, GrayBinIcon } from '../../../assets/icons';

type CartCardProps = {
	id: number;
	name: string;
	image: string;
	strength: string;
	dosageForm: string;
	quantity: number;
	unitPrice: number;
};
export const CartCard: FC<CartCardProps> = ({
	image,
	name,
	unitPrice,
	dosageForm,
	strength,
	quantity,
}) => {
	return (
		<div className="flex-items-center gap-2 border border-border-1 rounded-xl">
			<div>
				<img src={image} alt={image} className="rounded-l-xl w-32 h-40 sm:h-32 object-cover object-top" />
			</div>
			<div className="flex-1 p-4 space-y-1">
				<p className="text-typography-700 font-semibold">{name}</p>
				<span className="text-typography-700">
					{strength} {dosageForm}
				</span>
				<div className="flex-between mt-2 flex-col sm:flex-row gap-2">
					<div className="flex-items-center gap-3">
						<div className="p-0.5 hover:bg-gray-200 bg-gray-100 rounded-full cursor-pointer border border-border-1">
							<GrayBinIcon />
						</div>
						<p className="font-semibold text-typography-800">{quantity}</p>
						<div className="p-0.5 hover:bg-gray-200 bg-gray-100 rounded-full cursor-pointer border border-border-1">
							<GrayAddIcon />
						</div>
					</div>
					<p className="text-typography-700 font-semibold">MRU {unitPrice}</p>
				</div>
			</div>
		</div>
	);
};
