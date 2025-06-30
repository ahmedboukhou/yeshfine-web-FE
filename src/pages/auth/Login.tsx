import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';
import { useLoginMutation } from '../../apis/auth';
import { SIGNUP_ROUTE } from '../../appRoutes';
import { AuthCard, AuthCardHeading } from '../../components/common/cards/AuthCard';
import { InputField } from '../../components/common/inputs/InputField';
import { PhoneNumberInput } from '../../components/common/inputs/PhoneInput';
import { responseStatus } from '../../interfaces/enums';
import type { LoginInput } from '../../interfaces/formInputTypes';
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
		</AuthCard>
	);
};
