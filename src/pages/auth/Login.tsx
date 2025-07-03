import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';
import { useLoginMutation } from '../../apis/auth';
import { AuthCard, AuthCardHeading } from '../../components/common/cards/AuthCard';
import { InputField } from '../../components/common/inputs/InputField';
import { PhoneNumberInput } from '../../components/common/inputs/PhoneInput';
import { responseStatus } from '../../interfaces/enums';
import type { LoginInput } from '../../interfaces/formInputTypes';
import useAuthStore from '../../store/auth';
import { useCurrentUserStore } from '../../store/user';
import { loginSchema } from '../../validations';
import { VerifyOTP } from './signup/VerifyOTP';
import { Fragment, useState } from 'react';
import { SIGNUP_ROUTE } from '../../routes';

const loginInitialValues: LoginInput = { phone: '', password: '' };

export const Login = () => {
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
						loginUser(data.token, 'none');
					}
				}
			},
		});
	};

	return (
		<AuthCard>
			{!userNotVerified ? (
				<Fragment>
					<AuthCardHeading
						heading="Log in to your account"
						subHeading="Welcome back! Please enter your details."
					/>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="w-full flex flex-col gap-5">
							<PhoneNumberInput
								value={phone}
								onChange={(value) => setValue('phone', value)}
								register={register('phone')}
								error={errors.phone}
							/>
							<InputField
								label="Password"
								id="password"
								type="password"
								error={errors.password}
								register={register('password')}
							/>
						</div>
						<div className="text-right mt-2.5">
							<Link to="/forgot-password" className="link-text">
								Forgot Password
							</Link>
						</div>
						<button type="submit" className="my-8 primary-btn w-full" disabled={isPending}>
							Log In
						</button>
					</form>
					<p className="text-sm text-center">
						Don’t have an account?{' '}
						<Link to={SIGNUP_ROUTE} className="link-text">
							Signup
						</Link>
					</p>
				</Fragment>
			) : (
				<VerifyOTP phone={phone} />
			)}
		</AuthCard>
	);
};
