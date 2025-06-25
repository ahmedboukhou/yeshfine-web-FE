import { yupResolver } from '@hookform/resolvers/yup';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Fragment, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import { useSignupMutation } from '../../../apis/auth';
import logo from '../../../assets/logo.svg';
import { AuthCard } from '../../../components/common/cards/AuthCard';
import type { SignupInput } from '../../../interfaces';
import { Role } from '../../../interfaces/enums';
import { signupSchema } from '../../../validations';

const signupInitialValues: SignupInput = {
	name: '',
	phone: '',
	password: '',
	role: Role.Patient,
	confirm_password: '',
	dob: '',
};

function RouteComponent() {
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
	const { mutateAsync: signup } = useSignupMutation();
	const onSubmit: SubmitHandler<SignupInput> = (values) => {
		signup(values, {
			onSuccess: () => {
				// if (data?.status === responseStatus.Success) {
					toast.success('OTP sent successfully');
					setShowOtpScreen(true);
				// }
			},
		});
	};
	const SignupForm = () => (
		<Fragment>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col items-center">
					<img src={logo} alt="yeshfine-logo" className="mb-9" />
					<div className="flex flex-col gap-3 text-center mb-12">
						<h3 className="tex-2xl font-bold">Create an account</h3>
						<p className="text-gray-500">Welcome! Please enter your details.</p>
					</div>
					<div className="w-full flex flex-col gap-5">
						<div>
							<label htmlFor="phone" className="input-label">
								Name
							</label>
							<input
								type="phone"
								id="phone"
								className={`${errors.name ? '!outline-red-600' : ''} input input-box-shadow`}
								{...register('name')}
								placeholder="Enter"
							/>
							{errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
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
							/>
							{errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob.message}</p>}
						</div>

						<div>
							<label htmlFor="phone" className="input-label">
								Phone Number
							</label>
							<PhoneInput
								country={'us'}
								value={phone}
								{...register('phone')}
								onChange={(value) => setValue('phone', value)}
								buttonClass={`${errors.phone ? '` !border-red-600' : ''} !py-5 !rounded-l-lg`}
								inputClass={`${errors.phone ? '` !border-red-600' : ''} !py-5 !w-full !input-box-shadow !rounded-lg`}
							/>
							{errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
						</div>

						<div>
							<label htmlFor="password" className="input-label">
								Password
							</label>
							<input
								type="text"
								id="password"
								{...register('password')}
								className={`${errors.password ? '!outline-red-600' : ''} input input-box-shadow`}
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
								type="phone"
								id="confirm_password"
								{...register('confirm_password')}
								className={`${errors.confirm_password ? '!outline-red-600' : ''} input input-box-shadow`}
								placeholder="Enter"
							/>
							{errors.confirm_password && (
								<p className="text-red-600 text-sm mt-1">{errors.confirm_password.message}</p>
							)}
						</div>
					</div>
					<button className="my-8 primary-btn">Sign Up</button>
				</div>
			</form>

			<p className="text-sm text-center">
				Already have an account?{' '}
				<Link to="/login" className="link-text">
					Login
				</Link>
			</p>
		</Fragment>
	);

	const OTPForm = () => (
		<Fragment>
			{' '}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col items-center">
					<img src={logo} alt="yeshfine-logo" className="mb-9" />
					<div className="flex flex-col gap-3 text-center mb-12">
						<h3 className="tex-2xl font-bold">We’ve just sent you a code</h3>
						<p className="text-gray-500">Enter the 6-digit code just sent to (+92304****46)</p>
					</div>
					<div className="w-full flex flex-col gap-5">
						<div>
							<label htmlFor="phone" className="input-label">
								Name
							</label>
							<input
								type="phone"
								id="phone"
								className={`${errors.name ? '!outline-red-600' : ''} input input-box-shadow`}
								{...register('name')}
								placeholder="Enter"
							/>
							{errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
						</div>
					</div>
					<button className="my-8 primary-btn">Sign Up</button>
				</div>
			</form>
			<p className="text-sm text-center">
				Didn't get a text?
				<Link to="/login" className="link-text">
					Send again
				</Link>
			</p>
		</Fragment>
	);

	return <AuthCard>{showOtpScreen ? <OTPForm /> : <SignupForm />}</AuthCard>;
}

export const Route = createFileRoute('/_unauthenticated/_auth/signup')({
	component: RouteComponent,
});
