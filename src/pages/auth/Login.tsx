import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router';
import { useLoginMutation } from '../../apis/auth';
import { SIGNUP_ROUTE } from '../../appRoutes';
import logo from '../../assets/logo.svg';
import { AuthCard } from '../../components/common/cards/AuthCard';
import type { LoginInput } from '../../interfaces';
import { responseStatus } from '../../interfaces/enums';
import useAuthStore from '../../store/auth';
import { useCurrentUserStore } from '../../store/user';
import { loginSchema } from '../../validations';

const loginInitialValues: LoginInput = { phone: '', password: '' };

export const Login = () => {
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
		try {
			const response = (await login(values)) as any;
			if (response?.status === responseStatus.Success) {
				setCurrentUser(response?.user);
				loginUser(response?.token, 'none');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AuthCard>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col items-center">
					<img src={logo} alt="yeshfine-logo" className=" mb-9" />
					<div className="flex flex-col gap-3 text-center mb-12">
						<h3 className="text-2xl font-bold">Log in to your account</h3>
						<p className="text-typography-500">Welcome back! Please enter your details.</p>
					</div>

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
							{errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
						</div>
						<div>
							<label htmlFor="password" className="input-label">
								Password
							</label>
							<input
								type="password"
								id="password"
								{...register('password')}
								className={`${errors.password ? '!outline-red-600' : ''} input input-box-shadow`}
								placeholder="Enter"
							/>
							{errors.password && (
								<p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
							)}
						</div>
					</div>
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
		</AuthCard>
	);
};
