import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { Link } from 'react-router';
import { BackIcon } from '../../../assets/icons';
import logo from '../../../assets/logo.svg';
import { AuthCard } from '../../../components/common/cards/AuthCard';
import { forgotPasswordSchema } from '../../../validations';

type ForgotPasswordInput = {
	phone: string;
};

const forgotPasswordInitialValues: ForgotPasswordInput = { phone: '' };

export const ForgotPassword = () => {
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

	const phone = watch('phone');
	const onSubmit: SubmitHandler<ForgotPasswordInput> = async (inputs) => console.log(inputs);

	return (
		<AuthCard>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col items-center">
					<img src={logo} alt="yeshfine-logo" className=" mb-9" />
					<div className="flex flex-col gap-3 text-center mb-12">
						<h3 className="tex-2xl font-bold">Forgot Password?</h3>
						<p className="text-typography-500">No worries, we’ll send you reset instructions.</p>
					</div>

					<div className="w-full flex flex-col gap-5">
						<div>
							<label htmlFor="phone" className="input-label">
								Phone Number
							</label>
							<PhoneInput
								value={phone}
								{...register('phone')}
								onChange={(value) => setValue('phone', value)}
								buttonClass={`${errors.phone ? '` !border-red-600' : ''} !py-5 !rounded-l-lg `}
								inputClass={`${
									errors.phone ? '` !border-red-600' : ''
								} !py-5 !w-full !input-box-shadow !rounded-lg`}
							/>
							{errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
						</div>
					</div>
				</div>
				<button type="submit" className="my-8 primary-btn w-full">
					Next
				</button>
			</form>

			<Link to="/login" className="flex gap-2 items-center justify-center">
				<BackIcon />
				<span className="text-typography-700 text-sm font-semibold">Back to Login</span>
			</Link>
		</AuthCard>
	);
};
