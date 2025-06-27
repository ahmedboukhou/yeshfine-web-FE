import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link } from 'react-router';
import { useSignupMutation } from '../../../apis/auth';
import { LOGIN_ROUTE } from '../../../appRoutes';
import logo from '../../../assets/logo.svg';
import { AuthCard } from '../../../components/common/cards/AuthCard';
import type { SignupInput } from '../../../interfaces';
import { Role } from '../../../interfaces/enums';
import { maskPhoneNumber } from '../../../lib/helpers';
import { signupSchema } from '../../../validations';
import { VerifyOTP } from './VerifyOTP';

const signupInitialValues: SignupInput = {
	name: '',
	phone: '',
	password: '',
	role: Role.Patient,
	confirm_password: '',
	dob: '',
};

export const Signup = () => {
	const [showOtpScreen, setShowOtpScreen] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<SignupInput>({
		resolver: yupResolver(signupSchema),
		mode: 'all',
		defaultValues: signupInitialValues,
	});
	const phone = watch('phone');
	const { mutateAsync: signup, isPending } = useSignupMutation();
	const onSubmit: SubmitHandler<SignupInput> = (values) => {
		signup(values, {
			onSuccess: () => {
				// if (data?.status === responseStatus.Success) {
				setShowOtpScreen(true);
				// }
			},
		});
	};

	return (
		<AuthCard>
			<div className="flex justify-center text-center items-center flex-col gap- mb-12">
				<div>
					<img src={logo} alt="yeshfine-logo" className="mb-9" />
				</div>
				<h3 className="text-2xl font-bold">
					{showOtpScreen ? 'We’ve just sent you a code' : 'Create an account'}
				</h3>
				<p className="text-typography-500">
					{showOtpScreen
						? `We have sent a OTP code to (${phone && maskPhoneNumber(phone)})`
						: 'Welcome! Please enter your details.'}
				</p>
			</div>
			{showOtpScreen ? (
				<VerifyOTP phone={phone} />
			) : (
				<Fragment>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col items-center">
							<div className="w-full flex flex-col gap-5">
								<div>
									<label htmlFor="name" className="input-label">
										Name
									</label>
									<input
										id="name"
										className={`${errors.name ? '!outline-red-600' : ''} input input-box-shadow`}
										{...register('name')}
										placeholder="Enter"
									/>
									{errors.name && (
										<p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
									)}
								</div>
								<div>
									<label htmlFor="dob" className="input-label">
										Date of Birth
									</label>
									<input
										type="date"
										id="dob"
										className={`${errors.dob ? '!outline-red-600' : ''} input input-box-shadow`}
										{...register('dob')}
										placeholder="Enter"
										max={new Date().toISOString().split('T')[0]} //restrict to select future date
									/>
									{errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob.message}</p>}
								</div>

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
								<div>
									<label htmlFor="password" className="input-label">
										Password
									</label>
									<input
										type="password"
										id="password"
										{...register('password')}
										className={`${
											errors.password ? '!outline-red-600' : ''
										} input input-box-shadow`}
										placeholder="Enter"
									/>
									{errors.password && (
										<p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
									)}
								</div>
								<div>
									<label htmlFor="confirm_password" className="input-label">
										Confirm Password
									</label>
									<input
										type="password"
										id="confirm_password"
										{...register('confirm_password')}
										className={`${
											errors.confirm_password ? '!outline-red-600' : ''
										} input input-box-shadow`}
										placeholder="Enter"
									/>
									{errors.confirm_password && (
										<p className="text-red-600 text-sm mt-1">{errors.confirm_password.message}</p>
									)}
								</div>
							</div>
						</div>
						<button className="my-8 primary-btn w-full" disabled={isPending}>
							Sign Up
						</button>
					</form>
					<p className="text-sm text-center">
						Already have an account?{' '}
						<Link to={LOGIN_ROUTE} className="link-text">
							Login
						</Link>
					</p>
				</Fragment>
			)}
		</AuthCard>
	);
};
