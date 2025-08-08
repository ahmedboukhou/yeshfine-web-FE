import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BirthdayIcon, GenderIcon } from '../../../assets/icons';

type PatientInfoCardProps = {
	name?: string;
	phone?: string;
	image?: string;
	gender?: string;
	dob?: string;
};

export const PatientInfoCard: FC<PatientInfoCardProps> = ({ name, phone, dob, gender, image }) => {
	const { t } = useTranslation();

	return (
		<div className="border border-border-1 card-gradient-2 rounded-lg">
			<div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
				<div className="flex-items-center gap-2">
					<img className="inline-block size-18 rounded-full object-cover object-top" src={image} alt={name} />
					<div>
						<p className="font-bold text-typography-900 line-clamp-1">{name}</p>
						<span className="text-typography-700">{phone}</span>
					</div>
				</div>

				<div className="flex-items-center gap-2">
					<div className="bg-primary-light rounded-full size-10 flex-center ">
						<BirthdayIcon />
					</div>
					<div className="flex flex-col gap-1">
						<span className="font-medium text-typography-500">{t('dob')}</span>
						<span className="font-medium text-typography-800">{dob}</span>
					</div>
				</div>

				<div className="flex-items-center gap-2">
					<div className="bg-primary-light rounded-full size-10 flex-center ">
						<GenderIcon />
					</div>
					<div className="flex flex-col gap-1">
						<span className="font-medium text-typography-500">{t('gender')}</span>
						<span className="font-medium text-typography-800 capitalize">{gender}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
