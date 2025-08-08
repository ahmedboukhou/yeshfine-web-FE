import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useDoctorUpdateProfileMutation } from '../../../../apis/doctor/profile';
import { CameraIcon } from '../../../../assets/icons';
import { Stepper } from '../../../../components/ui/actions/Stepper';
import { PLACEHOLDER_IMAGE } from '../../../../constants';
import type { AvailabilityDay } from '../../../../interfaces';
import { HOME_ROUTE } from '../../../../routes';
import { useCurrentUserStore } from '../../../../store/user';
import { DoctorEditAvailabilityProfile } from './Availability';
import { DoctorEditPersonalProfile } from './Personal';
import { DoctorEditProfessionalProfile } from './Professional';

type DoctorEditProfileFormValues = {
	name: string;
	dob: string;
	gender: string;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	zipCode: string;
	file?: File[];
	biography: string;
	clinicName: string;
	experience: number;
	fee: string;
	liscenceNumber: string;
	speciality: string;
	availability: AvailabilityDay[];
};

const defaultAvailability: AvailabilityDay[] = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
].map((day) => ({
	day,
	isAvailable: false,
	slots: [{ startTime: '', endTime: '', ticketNumber: '' }],
}));

export const DoctorEditProfile = () => {
	const { t } = useTranslation(['common', 'auth', 'validations']);
	const { currentUser, setCurrentUser } = useCurrentUserStore((state) => state);
	const { image } = currentUser || {};
	const [step, setStep] = useState(1);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const navigate = useNavigate();
	const { mutateAsync: updateProfile } = useDoctorUpdateProfileMutation();

	const methods = useForm<DoctorEditProfileFormValues>({
		mode: 'all',
		defaultValues: {
			name: '',
			dob: '',
			gender: 'male',
			address: '',
			biography: '',
			clinicName: '',
			experience: 0,
			fee: '',
			liscenceNumber: '',
			speciality: '',
			availability: defaultAvailability,
		},
	});

	const { reset, setValue, watch } = methods;
	const { file } = watch();
	console.log('🚀 ~ DoctorEditProfile ~ file:', file);
	const mergeAvailability = (savedAvailability: any): AvailabilityDay[] => {
		return defaultAvailability.map((defaultDay) => {
			const dayShort = defaultDay.day.slice(0, 3); // e.g., 'sunday' -> 'sun'
			const found = savedAvailability[dayShort];
			if (found && Array.isArray(found)) {
				return {
					day: defaultDay.day,
					isAvailable: found.length > 0,
					slots: found.map((slot: any) => ({
						startTime: slot.start,
						endTime: slot.end,
						ticketNumber: slot.tickets.toString(),
					})),
				};
			}
			return defaultDay;
		});
	};
	// Populate fields when `step` changes
	useEffect(() => {
		if (!currentUser) return;

		reset({
			name: currentUser.name || '',
			dob: currentUser.dob || '',
			gender: currentUser.gender,
			address: currentUser.address || '',
			biography: currentUser.profile?.biography || '',
			clinicName: currentUser.profile?.clinicName || '',
			experience: currentUser.profile?.experience || 0,
			fee: currentUser.profile?.fee || '',
			liscenceNumber: currentUser.profile?.liscenceNumber || '',
			speciality: currentUser.profile?.speciality || '',
			availability: currentUser.profile?.availability
				? mergeAvailability(currentUser.profile.availability)
				: defaultAvailability,
		});
	}, [currentUser, reset]);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setValue('file', acceptedFiles);
			setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
		},
		[setValue]
	);

	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'image/*': [] },
		maxFiles: 1,
		maxSize: 5000000,
		onDrop,
	});

	const onSubmit: SubmitHandler<DoctorEditProfileFormValues> = ({
		// address,
		availability,
		biography,
		clinicName,
		dob,
		experience,
		fee,
		gender,
		liscenceNumber,
		name,
		speciality,
		// zipCode,
		// city,
		// country,
		// file,
		// state,
	}) => {
		const updatedAvailability = availability.reduce((acc, item) => {
			const dayShort = item.day.slice(0, 3);

			acc[dayShort] = item.isAvailable
				? item.slots.map((slot) => ({
						start: slot.startTime,
						end: slot.endTime,
						tickets: Number(slot.ticketNumber),
				  }))
				: [];

			return acc;
		}, {} as Record<string, { start: string; end: string; tickets: number }[]>);
		const formData = new FormData();

		formData.append('name', name);
		formData.append('gender', gender);
		formData.append('dob', dob);
		formData.append('biography', biography);
		formData.append('experience', `${experience}`);
		formData.append('clinicName', clinicName);
		formData.append('fee', fee);
		formData.append('liscenceNumber', liscenceNumber);
		formData.append('speciality', speciality);
		formData.append('availability', JSON.stringify(updatedAvailability));
		if (file && file.length > 0) {
			formData.append('file', file[0]);
		}

		// formValues?.city && formData.append('city', formValues?.city);
		// formValues?.state && formData.append('state', formValues?.state);
		// formValues?.country && formData.append('country', formValues?.country);
		// formValues?.zipCode && formData.append('zipCode', formValues?.zipCode);
		// formValues?.address && formData.append('address', formValues?.address);

		updateProfile(formData, {
			onSuccess: ({ message, data }) => {
				toast.success(message);
				setCurrentUser({
					...currentUser,
					...data,
					availability: updatedAvailability,
				});
				navigate(HOME_ROUTE);
			},
		});
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<div className="pb-3">
					<div className="flex-center space-y-2 flex-col -mt-15 mb-10">
						<div className="relative">
							<img
								src={previewImage ?? image ?? PLACEHOLDER_IMAGE}
								className="h-30 w-30 rounded-full object-cover border-4 border-white"
							/>
							{step === 1 && (
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<div className="absolute bg-white p-1 rounded-full cursor-pointer bottom-0 right-0">
										<CameraIcon />
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="w-full mx-auto mb-5">
						<Stepper
							steps={[t('personal'), t('professional'), t('availability')]}
							currentStep={step}
						/>
					</div>

					{step === 1 && <DoctorEditPersonalProfile setStep={setStep} />}
					{step === 2 && <DoctorEditProfessionalProfile setStep={setStep} />}
					{step === 3 && <DoctorEditAvailabilityProfile setStep={setStep} />}
				</div>
			</form>
		</FormProvider>
	);
};
