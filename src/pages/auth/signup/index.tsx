import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useSignupMutation } from '../../../apis/auth';
import { TickIcon } from '../../../assets/icons';
import { AuthCard, AuthCardHeading } from '../../../components/common/cards/AuthCard';
import { InputField } from '../../../components/common/inputs/InputField';
import { PhoneNumberInput } from '../../../components/common/inputs/PhoneInput';
import { Role } from '../../../interfaces/enums';
import type { SignupInput } from '../../../interfaces/formInputTypes';
import { LOGIN_ROUTE } from '../../../routes';
import { signupSchema } from '../../../validations';
import { VerifyOTP } from './VerifyOTP';

const defaultValues: SignupInput = {
	name: '',
	phone: '',
	password: '',
	confirm_password: '',
	role: Role.Patient,
	dob: '',
};

export const Signup = () => {
	const { t } = useTranslation(['auth', 'common']);

	const [step, setStep] = useState<'role' | 'form' | 'otp'>('role');
	const [role, setRole] = useState<Role>(Role.Patient);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<SignupInput>({
		resolver: yupResolver(signupSchema),
		mode: 'all',
		defaultValues,
	});

	const phone = watch('phone');
	const { mutateAsync: signup, isPending } = useSignupMutation();

	const onSubmit: SubmitHandler<SignupInput> = ({ dob, name, password, phone, role }) => {
		signup(
			{ dob, name, password, phone, role },
			{
				onSuccess: () => setStep('otp'),
			}
		);
	};

	if (step === 'otp')
		return (
			<AuthCard>
				<VerifyOTP phone={phone} />
			</AuthCard>
		);

	return (
		<AuthCard>
			<AuthCardHeading
				heading={step === 'role' ? t('selectAccountType') : t('createAccount')}
				subHeading={step === 'role' ? t('welcomeMessage') : t('enterDetails')}
			/>

			{step === 'role' ? (
				<div>
					<div className="grid sm:grid-cols-2 gap-4">
						{Object.values(Role).map((item) => (
							<div
								key={item}
								onClick={() => setRole(item)}
								className={`p-6 rounded-lg border cursor-pointer capitalize text-center relative ${
									role === item
										? 'text-primary font-bold border-primary bg-primary-light-hover'
										: 'bg-white border-gray-300 text-typography-600 font-medium'
								}`}
							>
								{role === item && (
									<div className="absolute top-2 left-2">
										<TickIcon />
									</div>
								)}
								{t(item, { ns: 'common' })}
							</div>
						))}
					</div>
					<button className="mt-8 primary-btn w-full" onClick={() => setStep('form')}>
						{t('next', { ns: 'common' })}
					</button>
				</div>
			) : (
				<Fragment>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-5">
							<InputField
								label={t('fullName')}
								id="name"
								type="text"
								register={register('name')}
								error={errors.name}
							/>

							<InputField
								label={t('dob')}
								id="dob"
								type="date"
								restrictFutureDate
								register={register('dob')}
								error={errors.dob}
							/>

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
								register={register('password')}
								error={errors.password}
							/>

							<InputField
								label={t('confirmPassword')}
								id="confirm_password"
								type="password"
								register={register('confirm_password')}
								error={errors.confirm_password}
							/>
						</div>
						<button type="submit" className="my-8 primary-btn w-full" disabled={isPending}>
							{t('signUp')}
						</button>
					</form>

					<p className="text-sm text-center">
						{t('alreadyHaveAccount')}{' '}
						<Link to={LOGIN_ROUTE} className="link-text">
							{t('logIn')}
						</Link>
					</p>
				</Fragment>
			)}
		</AuthCard>
	);
};
