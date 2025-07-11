import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useResetPasswordMutation } from '../../../apis/auth';
import { InputField } from '../../../components/ui/inputs/InputField';
import type { ResetPasswordInput } from '../../../interfaces/formInputTypes';
import { LOGIN_ROUTE } from '../../../routes';
import { resetPasswordSchema } from '../../../validations';
import { AuthCardHeading } from '../../../components/ui/cards/AuthCard';

const defaultValues: ResetPasswordInput = {
	phone: '',
	newPassword: '',
	confirm_password: '',
};

export const ResetPassword = ({
	phone,
	setSuccess,
	success,
}: {
	phone: string;
	success: boolean;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['auth', 'common']);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordInput>({
		resolver: yupResolver(resetPasswordSchema),
		mode: 'all',
		defaultValues,
	});

	const { mutateAsync: resetPassword, isPending } = useResetPasswordMutation();

	const onSubmit: SubmitHandler<ResetPasswordInput> = async (values) => {
		resetPassword(
			{ ...values, phone },
			{
				onSuccess: () => setSuccess(true),
			}
		);
	};

	return (
		<Fragment>
			<AuthCardHeading
				heading={success ? t('passwordResetSuccess') : t('createNewPassword')}
				subHeading={success ? t('resetSuccessMessage') : t('rememberNewPassword')}
			/>
			{!success ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-5">
						<InputField
							label={t('newPassword')}
							id="password"
							type="password"
							error={errors.newPassword}
							register={register('newPassword')}
						/>
						<InputField
							label={t('confirmPassword')}
							id="confirm_password"
							type="password"
							error={errors.confirm_password}
							register={register('confirm_password')}
						/>
					</div>
					<button type="submit" className="mt-8 primary-btn w-full" disabled={isPending}>
						{t('next', { ns: 'common' })}
					</button>
				</form>
			) : (
				<button className="mt-8 primary-btn w-full" onClick={() => navigate(LOGIN_ROUTE)}>
					{t('next', { ns: 'continue' })}
				</button>
			)}
		</Fragment>
	);
};
