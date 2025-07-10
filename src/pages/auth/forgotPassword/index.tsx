import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useForgotPasswordMutation } from '../../../apis/auth';
import { BackIcon } from '../../../assets/icons';
import { PhoneNumberInput } from '../../../components/ui/inputs/PhoneInput';
import { AuthCard, AuthCardHeading } from '../../../components/ui/cards/AuthCard';
import type { ForgotPasswordInput } from '../../../interfaces/formInputTypes';
import { LOGIN_ROUTE } from '../../../routes';
import { forgotPasswordSchema } from '../../../validations';
import { VerifyOTP } from '../signup/VerifyOTP';
import { ResetPassword } from './ResetPassword';

const defaultValues: ForgotPasswordInput = { phone: '' };

export const ForgotPassword = () => {
	const { t } = useTranslation(['auth', 'common']);
	const navigate = useNavigate();

	const [showOtpScreen, setShowOtpScreen] = useState(false);
	const [showCreatePasswordForm, setShowCreatePasswordForm] = useState(false);
	const [success, setSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<ForgotPasswordInput>({
		resolver: yupResolver(forgotPasswordSchema),
		mode: 'all',
		defaultValues,
	});

	const { mutateAsync: forgotPassword, isPending } = useForgotPasswordMutation();
	const phone = watch('phone');

	const onSubmit: SubmitHandler<ForgotPasswordInput> = async (values) => {
		forgotPassword(values, {
			onSuccess: () => setShowOtpScreen(true),
		});
	};

	const handleBack = () => {
		if (showCreatePasswordForm || showOtpScreen) {
			setShowCreatePasswordForm(false);
			setShowOtpScreen(false);
		} else {
			navigate(LOGIN_ROUTE);
		}
	};

	if (showCreatePasswordForm) {
		return (
			<AuthCard>
				<ResetPassword phone={phone} success={success} setSuccess={setSuccess} />
				{!success && <BackButton onClick={handleBack} label={t('back', { ns: 'common' })} />}
			</AuthCard>
		);
	}

	if (showOtpScreen) {
		return (
			<AuthCard>
				<VerifyOTP
					phone={phone}
					setShowCreatePasswordForm={setShowCreatePasswordForm}
					isForgotPassword
				/>
				<BackButton onClick={handleBack} label={t('back', { ns: 'common' })} />
			</AuthCard>
		);
	}

	return (
		<AuthCard>
			<AuthCardHeading heading={t('forgotPasswordQuestion')} subHeading={t('forgotPasswordInfo')} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<PhoneNumberInput
					value={phone}
					label={t('phoneNumber')}
					onChange={(value) => setValue('phone', value)}
					register={register('phone')}
					error={errors.phone}
				/>
				<button type="submit" className="mt-8 primary-btn w-full" disabled={isPending}>
					{t('next', { ns: 'common' })}
				</button>
			</form>
			<BackButton onClick={handleBack} label={t('backToLogin')} />
		</AuthCard>
	);
};

const BackButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
	<div className="flex justify-center">
		<button onClick={onClick} className="gap-2 flex-items-center mt-8 cursor-pointer">
			<BackIcon />
			<span className="link-text-secondary">{label}</span>
		</button>
	</div>
);
