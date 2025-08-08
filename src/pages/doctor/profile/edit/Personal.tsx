import type { Dispatch, FC, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { InputField } from '../../../../components/ui/inputs/InputField';
import { PhoneNumberInput } from '../../../../components/ui/inputs/PhoneInput';
import { SelectField } from '../../../../components/ui/inputs/SelectField';
import AddressModal from '../../../../components/ui/modals/AddressModal';
import { genderOptions } from '../../../../constants';
import { HOME_ROUTE } from '../../../../routes';
import { useCurrentUserStore } from '../../../../store/user';

type Props = {
	setStep: Dispatch<SetStateAction<number>>;
};

export const DoctorEditPersonalProfile: FC<Props> = ({ setStep }) => {
	const { t } = useTranslation(['common', 'auth', 'validations']);
	const {
		register,
		setValue,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useFormContext();
	const { currentUser, setCurrentUser } = useCurrentUserStore((state) => state);
	const id = 'address-modal';

	const onSubmit = () => {
		console.log('Latest values:', getValues());
		setStep(2);
	};

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<InputField label={t('name')} id="name" register={register('name')} error={errors.name} />

				<SelectField
					label={t('gender', { ns: 'common' })}
					id="gender"
					register={register('gender')}
					options={genderOptions.map((gender) => ({
						value: gender,
						label: t(gender, { ns: 'common' }),
					}))}
					error={errors.gender}
				/>

				<PhoneNumberInput value={currentUser?.phone || ''} label={t('phoneNumber')} disabled />

				<InputField
					label={t('dob', { ns: 'common' })}
					id="dob"
					type="date"
					register={register('dob')}
					error={errors.dob}
				/>

				<div
					className="sm:col-span-2 cursor-pointer"
					aria-haspopup="dialog"
					aria-expanded="false"
					aria-controls={`hs-${id}`}
					data-hs-overlay={`#hs-${id}`}
				>
					<InputField
						label={t('address', { ns: 'common' })}
						id="address"
						inputProps={{ readOnly: true, className: 'cursor-pointer' }}
						register={register('address')}
						error={errors.address}
					/>
				</div>
			</div>

			<div className="flex-end gap-5 mt-12">
				<Link to={HOME_ROUTE} className="outlined-btn">
					{t('cancel')}
				</Link>
				<button className="primary-btn" onClick={handleSubmit(onSubmit)}>
					{t('next')}
				</button>
			</div>

			<AddressModal
				id={id}
				onUpdate={(address) => {
					setCurrentUser({ ...currentUser, address: address.address });
					setValue('address', address.address, { shouldDirty: true });
				}}
			/>
		</>
	);
};
