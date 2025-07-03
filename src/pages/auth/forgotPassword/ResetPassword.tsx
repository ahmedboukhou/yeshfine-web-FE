import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useResetPasswordMutation } from '../../../apis/auth';
import { AuthCardHeading } from '../../../components/common/cards/AuthCard';
import { InputField } from '../../../components/common/inputs/InputField';
import type { ResetPasswordInput } from '../../../interfaces/formInputTypes';
import { LOGIN_ROUTE } from '../../../routes';
import { resetPasswordSchema } from '../../../validations';

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
				heading={success ? 'Password Reset Successful' : 'Create New Password'}
				subHeading={
					success
						? 'Your password has been successfully reset. Click below to log in.'
						: 'Please make sure to remember your new password'
				}
			/>
			{!success ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-5">
						<InputField
							label="New Password"
							id="password"
							type="password"
							error={errors.newPassword}
							register={register('newPassword')}
						/>
						<InputField
							label="Confirm Password"
							id="confirm_password"
							type="password"
							error={errors.confirm_password}
							register={register('confirm_password')}
						/>
					</div>
					<button type="submit" className="mt-8 primary-btn w-full" disabled={isPending}>
						Next
					</button>
				</form>
			) : (
				<button className="mt-8 primary-btn w-full" onClick={() => navigate(LOGIN_ROUTE)}>
					Continue
				</button>
			)}
		</Fragment>
	);
};
