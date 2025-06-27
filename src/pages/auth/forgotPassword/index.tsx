import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useForgotPasswordMutation } from '../../../apis/auth';
import { LOGIN_ROUTE } from '../../../appRoutes';
import { BackIcon } from '../../../assets/icons';
import logo from '../../../assets/logo.svg';
import { AuthCard } from '../../../components/common/cards/AuthCard';
import type { ForgotPasswordInput } from '../../../interfaces/formInputTypes';
import { maskPhoneNumber } from '../../../lib/helpers';
import { forgotPasswordSchema } from '../../../validations';
import { VerifyOTP } from '../signup/VerifyOTP';
import { ResetPassword } from './ResetPassword';

const forgotPasswordInitialValues: ForgotPasswordInput = { phone: '' };

export const ForgotPassword = () => {
	const navigate = useNavigate();

	const [showOtpScreen, setShowOtpScreen] = useState(false);
	const [showCreatePasswordForm, setShowCreatePasswordForm] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<ForgotPasswordInput>({
		resolver: yupResolver(forgotPasswordSchema),
		mode: 'all',
		defaultValues: forgotPasswordInitialValues,
	});

	const { mutateAsync: forgotPassword, isPending } = useForgotPasswordMutation();

	const phone = watch('phone');
	const onSubmit: SubmitHandler<ForgotPasswordInput> = async (values) => {
		forgotPassword(values, {
			onSuccess(data) {
				toast.success(data?.message);
				setShowOtpScreen(true);
			},
			onError(error) {
				toast.error(error.message || 'Something went wrong');
			},
		});
	};

	const handleBack = () => {
		if (!showCreatePasswordForm && !showOtpScreen) navigate(LOGIN_ROUTE);
		else {
			setShowCreatePasswordForm(false);
			setShowOtpScreen(false);
		}
	};

	return (
		<AuthCard>
			{!showCreatePasswordForm ? (
				<Fragment>
					<div className="flex justify-center text-center items-center flex-col gap-3 mb-12">
						<div>
							<img src={logo} alt="yeshfine-logo" className="mb-9" />
						</div>
						<h3 className="text-2xl font-bold">
							{showOtpScreen ? 'We’ve just sent you a code' : 'Forgot Password?'}
						</h3>
						<p className="text-typography-500">
							{showOtpScreen
								? `We have sent a OTP code to (${phone && maskPhoneNumber(phone)})`
								: 'No worries, we’ll send you reset instructions.'}
						</p>
					</div>
					{!showOtpScreen ? (
						<Fragment>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col items-center">
									<div className="w-full flex flex-col gap-5">
										<div>
											<label htmlFor="phone" className="input-label">
												Phone Number
											</label>
											<PhoneInput
												country="us"
												value={phone}
												{...register('phone')}
												onChange={(value) => setValue('phone', value)}
												buttonClass={`${errors.phone ? '!border-red-600' : ''} !py-1 !rounded-l-lg`}
												inputClass={`${
													errors.phone
														? '`!focus:border-none !border-red-600 focus:ring-red-600 focus:ring-1'
														: 'focus:ring-primary focus:ring-2 !focus:border-none'
												} !py-5 !w-full !input-box-shadow !input !rounded-lg`}
											/>
											{errors.phone && (
												<p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
											)}
										</div>
									</div>
								</div>
								<button type="submit" className="mt-8 primary-btn w-full" disabled={isPending}>
									Next
								</button>
							</form>
						</Fragment>
					) : (
						<VerifyOTP
							phone={phone}
							setShowCreatePasswordForm={setShowCreatePasswordForm}
							isForgotPassword
						/>
					)}
				</Fragment>
			) : (
				<ResetPassword phone={phone} />
			)}
			<div className="flex justify-center">
				<button
					onClick={handleBack}
					className="flex gap-2 items-center justify-center mt-8 cursor-pointer"
				>
					<BackIcon />
					<span className="link-text-secondary">
						Back {!showCreatePasswordForm && !showOtpScreen && 'to Login'}
					</span>
				</button>
			</div>
		</AuthCard>
	);
};
