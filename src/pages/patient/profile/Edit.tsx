import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputField } from '../../../components/ui/inputs/InputField';
import { SelectField } from '../../../components/ui/inputs/SelectField';
import { genderOptions } from '../../../constants/mappedData';
import type { PatientProfileInput } from '../../../interfaces/formInputTypes';
import { useCurrentUserStore } from '../../../store/user';
import { patientProfileSchema } from '../../../validations';

const defaultValues: PatientProfileInput = {
	name: '',
	dob: '',
	gender: '',
};

export const PatientEditProfile = () => {
	const { t } = useTranslation();
	const { currentUser } = useCurrentUserStore((state) => state);
	const { image } = currentUser || {};
	const {
		register,
		// handleSubmit,
		// setValue,
		formState: { errors },
	} = useForm<PatientProfileInput>({
		resolver: yupResolver(patientProfileSchema(t)),
		mode: 'all',
		defaultValues,
	});
	return (
		<div>
			<div className="flex-center space-y-2 flex-col -mt-15 mb-20">
				<img
					src={
						image ??
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s'
					}
					className="h-30 w-30 rounded-full object-cover border-4 border-white "
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<InputField label={t('name')} id="name" register={register('name')} error={errors.name} />

				<SelectField
					label={t('gender', { ns: 'common' })}
					id="gender"
					register={register('gender')}
					options={genderOptions.map((gender) => {
						return { value: gender, label: t(gender, { ns: 'common' }) };
					})}
					error={errors.gender}
				/>

				<InputField
					label={t('dob', { ns: 'common' })}
					id="dob"
					type="date"
					register={register('dob')}
					error={errors.dob}
				/>
			</div>

			<div className="flex-end gap-5 mt-12">
				<button className="outlined-btn">{t('cancel')}</button>
				<button className="primary-btn">{t('save')}</button>
			</div>
		</div>
	);
};
