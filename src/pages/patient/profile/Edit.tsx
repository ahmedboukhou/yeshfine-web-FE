import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { useDropzone, type FileWithPath } from 'react-dropzone';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { usePatientUpdateProfileMutation } from '../../../apis/patient/profile';
import { CameraIcon } from '../../../assets/icons';
import { InputField } from '../../../components/ui/inputs/InputField';
import { PhoneNumberInput } from '../../../components/ui/inputs/PhoneInput';
import { SelectField } from '../../../components/ui/inputs/SelectField';
import AddressModal from '../../../components/ui/modals/AddressModal';
import { genderOptions, PLACEHOLDER_IMAGE } from '../../../constants';
import type { PatientProfileInput } from '../../../interfaces/formInputTypes';
import { HOME_ROUTE } from '../../../routes';
import { useCurrentUserStore } from '../../../store/user';
import { patientProfileSchema } from '../../../validations';

export const PatientEditProfile: FC<{ setShowEditProfile: Dispatch<SetStateAction<boolean>> }> = ({
	setShowEditProfile,
}) => {
	const { t } = useTranslation(['common', 'auth', 'validations']);

	const { currentUser, setCurrentUser } = useCurrentUserStore((state) => state);
	const { image } = currentUser || {};
	const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
	console.log('🚀 ~ PatientEditProfile ~ uploadedFiles:', uploadedFiles);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const id = 'asd';

	const { mutateAsync: updateProfile, isPending } = usePatientUpdateProfileMutation();

	const defaultValues: PatientProfileInput = {
		name: currentUser?.name || '',
		dob: currentUser?.dob || '',
		gender: currentUser?.gender || '',
		address: currentUser?.address || '',
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<PatientProfileInput>({
		resolver: yupResolver(patientProfileSchema(t)),
		mode: 'all',
		defaultValues,
	});

	const onSubmit: SubmitHandler<PatientProfileInput> = ({ dob, gender, name }) => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('gender', gender);
		formData.append('dob', dob);

		if (uploadedFiles.length > 0) {
			formData.append('file', uploadedFiles[0]);
		}

		setShowEditProfile(false);
		setCurrentUser({
			...currentUser,
			name,
			gender,
			dob,
		});
		updateProfile(formData);
	};

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setUploadedFiles(acceptedFiles);
		setPreviewImage(URL.createObjectURL(acceptedFiles[0])); // temporary preview
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'image/*': [] },
		maxFiles: 1,
		maxSize: 5000000, // 5 MB
		onDrop,
	});

	return (
		<div>
			<div className="flex-center space-y-2 flex-col -mt-15 mb-20">
				<div className="relative">
					<img
						src={previewImage ?? image ?? PLACEHOLDER_IMAGE}
						className="h-30 w-30 rounded-full object-cover border-4 border-white"
					/>
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						<div className="absolute bg-white p-1 rounded-full cursor-pointer bottom-0 right-0">
							<CameraIcon />
						</div>
					</div>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
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
							inputProps={{
								readOnly: true,
								className: 'cursor-pointer',
							}}
							register={register('address')}
							error={errors.address}
						/>
					</div>
				</div>

				<div className="flex-end gap-5 mt-12">
					<Link to={HOME_ROUTE} className="outlined-btn">
						{t('cancel')}
					</Link>
					<button className="primary-btn" disabled={isPending || !isDirty}>
						{t('save')}
					</button>
				</div>
			</form>

			<AddressModal id={id} setShowEditProfile={setShowEditProfile} />
		</div>
	);
};
