import { type Dispatch, type FC, type SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputField } from '../../../../components/ui/inputs/InputField';

type Props = {
	setStep: Dispatch<SetStateAction<number>>;
};

export const LabEditProfessionalProfile: FC<Props> = ({ setStep }) => {
	const { t } = useTranslation(['common', 'auth', 'validations']);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext();

	const onSubmit = () => {
		setStep(3);
	};

	return (
		<>
			{' '}
			<div className="grid grid-cols-1 gap-4">
				<InputField
					label={t('licenseNumber')}
					id="licenseNumber"
					register={register('licenseNumber')}
					error={errors.licenseNumber}
				/>
			</div>
			<div className="flex-end gap-5 mt-12">
				<button type="button" onClick={() => setStep(1)} className="outlined-btn">
					{t('back')}
				</button>
				<button className="primary-btn" onClick={handleSubmit(onSubmit)}>
					{t('next')}
				</button>
			</div>
		</>
	);
};
