import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useLoginMutation } from '../../apis/auth';
import { InputField } from '../../components/ui/inputs/InputField';
import { PhoneNumberInput } from '../../components/ui/inputs/PhoneInput';
import { responseStatus } from '../../interfaces/enums';
import type { LoginInput } from '../../interfaces/formInputTypes';
import { SIGNUP_ROUTE } from '../../routes';
import useAuthStore from '../../store/auth';
import { useCurrentUserStore } from '../../store/user';
import { loginSchema } from '../../validations';
import { VerifyOTP } from './signup/VerifyOTP';
import { AuthCard, AuthCardHeading } from '../../components/ui/cards/AuthCard';

const loginInitialValues: LoginInput = { phone: '', password: '' };

export const Login = () => {
	const { t } = useTranslation(['auth']);
	const [userNotVerified, setUserNotVerified] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: yupResolver(loginSchema),
		mode: 'all',
		defaultValues: loginInitialValues,
	});
	const { loginUser } = useAuthStore((state) => state);
	const { setCurrentUser } = useCurrentUserStore((state) => state);

	const phone = watch('phone');
	const { mutateAsync: login, isPending } = useLoginMutation();

	const onSubmit: SubmitHandler<LoginInput> = async (values) => {
		login(values, {
			onSuccess: (data) => {
				if (data.status === responseStatus.Success) {
					if (!data?.isOtpVerified) {
						setUserNotVerified(true);
					} else {
						setCurrentUser(data.user);
						loginUser(data.token, data.refreshToken);
					}
				}
			},
		});
	};

	return (
		<AuthCard>
			{!userNotVerified ? (
				<Fragment>
					<AuthCardHeading heading={t('loginToAccount')} subHeading={t('welcomeBack')} />
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="w-full flex flex-col gap-5">
							<PhoneNumberInput
								value={phone}
								label={t('phoneNumber')}
								onChange={(value) => setValue('phone', value)}
								register={register('phone')}
								error={errors.phone}
							/>
							<InputField
								label={t('password')}
								id="password"
								type="password"
								error={errors.password}
								register={register('password')}
							/>
						</div>
						<div className="text-right mt-2.5">
							<Link to="/forgot-password" className="link-text">
								{t('forgotPassword')}
							</Link>
						</div>
						<button type="submit" className="my-8 primary-btn w-full" disabled={isPending}>
							{t('logIn')}
						</button>
					</form>
					<p className="text-sm text-center">
						{t('noAccountPrompt')}{' '}
						<Link to={SIGNUP_ROUTE} className="link-text">
							{t('signUp')}
						</Link>
					</p>
				</Fragment>
			) : (
				<VerifyOTP phone={phone} />
			)}
		</AuthCard>
	);
};
