import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';
import logo from '../../assets/logo.svg';
import { useLoginMutation } from '../../apis/auth';
import { AuthCard } from '../../components/common/cards/AuthCard';
import type { LoginInput } from '../../interfaces';
import { responseStatus } from '../../interfaces/enums';
import useAuthStore from '../../store/auth';
import { useCurrentUserStore } from '../../store/user';
import { loginSchema } from '../../validations';
import { SIGNUP_ROUTE } from '../../appRoutes';

const loginInitialValues: LoginInput = { phone: '', password: '' };

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: yupResolver(loginSchema),
		mode: 'all',
		defaultValues: loginInitialValues,
	});
	const { loginUser } = useAuthStore((state) => state);
	const { setCurrentUser } = useCurrentUserStore((state) => state);

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
						<h3 className="tex-2xl font-bold">Log in to your account</h3>
						<p className="text-typography-500">Welcome back! Please enter your details.</p>
					</div>

					<div className="w-full flex flex-col gap-5">
						<div>
							<label htmlFor="phone" className="input-label">
								Phone Number
							</label>
							<input
								type="text"
								id="phone"
								className={`${errors.phone ? '!outline-red-600' : ''} input input-box-shadow`}
								{...register('phone')}
								placeholder="Enter"
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
