import { yupResolver } from '@hookform/resolvers/yup';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLoginMutation } from '../../../apis/auth';
import logo from '../../../assets/logo.svg';
import { AuthCard } from '../../../components/common/cards/AuthCard';
import type { LoginInput } from '../../../interfaces';
import { loginSchema } from '../../../validations';

const loginInitialValues: LoginInput = { phone: '', password: '' };

function RouteComponent() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: yupResolver(loginSchema),
		mode: 'all',
		defaultValues: loginInitialValues,
	});

	const { mutateAsync: login } = useLoginMutation();
	const onSubmit: SubmitHandler<LoginInput> = async (values) => {
		login(values);
		
	};

	return (
		<AuthCard>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col items-center">
					<img src={logo} alt="yeshfine-logo" className=" mb-9" />
					<div className="flex flex-col gap-3 text-center mb-12">
						<h3 className="tex-2xl font-bold">Log in to your account</h3>
						<p className="text-gray-500">Welcome back! Please enter your details.</p>
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
				<button type="submit" className="my-8 primary-btn">
					Log In
				</button>
			</form>
			<p className="text-sm text-center">
				Already have an account?{' '}
				<Link to="/signup" className="link-text">
					Signup
				</Link>
			</p>
		</AuthCard>
	);
}

export const Route = createFileRoute('/_unauthenticated/_auth/login')({
	component: RouteComponent,
});
