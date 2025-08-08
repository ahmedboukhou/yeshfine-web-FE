import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputField } from '../../../../components/ui/inputs/InputField';
import { SelectField } from '../../../../components/ui/inputs/SelectField';
import { useDoctorSpecialtiesStore } from '../../../../store/doctorSpecialties';
import { useGetDoctorSpecialtiesQuery } from '../../../../apis/patient/doctors';
import { useEffect, type Dispatch, type FC, type SetStateAction } from 'react';
import { toCapitalCase } from '../../../../lib/helpers';

type Props = {
	setStep: Dispatch<SetStateAction<number>>;
};

export const DoctorEditProfessionalProfile: FC<Props> = ({ setStep }) => {
	const { t } = useTranslation(['common', 'auth', 'validations']);
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useFormContext();

	const { setSpecialties, specialties } = useDoctorSpecialtiesStore((state) => state);
	const { data, isSuccess } = useGetDoctorSpecialtiesQuery();
	const doctorSpecialties = data?.data?.doctorCategories || [];

	useEffect(() => {
		isSuccess && setSpecialties(doctorSpecialties);
	}, [isSuccess]);

	const onSubmit = () => {
		console.log('Latest values:', getValues());

		setStep(3);
	};

	return (
		<>
			{' '}
			<div className="grid grid-cols-12 gap-4">
				<div className="md:col-span-4 sm:col-span-2 col-span-12">
					<SelectField
						label={t('specialty')}
						id="specialty"
						register={register('speciality')}
						options={specialties.map(({ name }) => ({
							value: name,
							label: toCapitalCase(name),
						}))}
						error={errors.speciality}
					/>
				</div>

				<div className="md:col-span-4 sm:col-span-2 col-span-12">
					<InputField
						label={t('hospitalName')}
						id="clinicName"
						register={register('clinicName')}
						error={errors.clinicName}
					/>
				</div>

				<div className="md:col-span-4 sm:col-span-2 col-span-12">
					<InputField
						label={t('experience')}
						id="experience"
						register={register('experience')}
						error={errors.experience}
					/>
				</div>

				<div className="sm:col-span-6 col-span-12">
					<InputField
						label={t('licenseNumber')}
						id="licenseNumber"
						register={register('liscenceNumber')}
						error={errors.liscenceNumber}
					/>
				</div>

				<div className="sm:col-span-6 col-span-12">
					<InputField
						label={t('price', { ns: 'patient' })}
						id="price"
						register={register('fee')}
						error={errors.fee}
					/>
				</div>

				<div className="col-span-12">
					<label htmlFor="biography" className="text-sm">
						{t('biography')}
					</label>
					<textarea
						className="input input-box-shadow mt-1"
						id="biography"
						{...register('biography')}
					/>
				</div>
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
