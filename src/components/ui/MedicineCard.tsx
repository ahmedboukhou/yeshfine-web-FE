import { Fragment, useState, type FC } from 'react';
import MedicineDetailModal from './modals/MedicineDetail';

type MedicineCardProps = {
	id: number | string;
	image: string;
	name: string;
	strength: string;
	dosage: string;
	price: number | string;
};
export const MedicineCard: FC<MedicineCardProps> = ({
	id,
	image,
	name,
	strength,
	dosage,
	price,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<div
				key={`${id}`}
				aria-haspopup="dialog"
				aria-expanded="false"
				aria-controls={`hs-${id}`}
				data-hs-overlay={`#hs-${id}`}
				onClick={() => setOpen(true)}
				className="border border-border-1 rounded-xl h-55 overflow-hidden bg-white cursor-pointer"
			>
				<img src={image} alt={name} className="rounded-t-xl h-30 w-full object-cover object-top" />

				<div className="p-2 flex flex-col gap-1">
					<span className="text-typography-700 font-semibold">MRU {price}</span>
					<small className="text-typography-700 font-semibold line-clamp-1">
						{strength} {dosage}
					</small>
					<span className="text-typography-700 line-clamp-2">{name}</span>
				</div>
			</div>
			<MedicineDetailModal id={`${id}`} open={open} onClose={() => setOpen(false)} />
		</Fragment>
	);
};
