import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState, type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useResetPasswordMutation } from '../../../apis/auth';
import { LOGIN_ROUTE } from '../../../appRoutes';
import logo from '../../../assets/logo.svg';
import type { ResetPasswordInput } from '../../../interfaces/formInputTypes';
import { resetPasswordSchema } from '../../../validations';

const resetPasswordInitialValues: ResetPasswordInput = {
	phone: '',
	confirm_password: '',
	newPassword: '',
};

export const ResetPassword: FC<{
	phone: string;
}> = ({ phone }) => {
	const navigate = useNavigate();

	const [showPasswordChangedSuccessful, setShowPasswordChangedSuccessful] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordInput>({
		resolver: yupResolver(resetPasswordSchema),
		mode: 'all',
		defaultValues: resetPasswordInitialValues,
	});

	const { mutateAsync: resetPassword, isPending } = useResetPasswordMutation();

	const onSubmit: SubmitHandler<ResetPasswordInput> = async (values) => {
		resetPassword(
			{ ...values, phone },
			{
				onSuccess() {
					setShowPasswordChangedSuccessful(true);
				},
				onError(error) {
					toast.error(error.message || 'Something went wrong');
				},
			}
		);
	};
	return (
		<Fragment>
			<div className="flex justify-center text-center items-center flex-col gap-3 mb-12">
				<div>
					<img src={logo} alt="yeshfine-logo" className="mb-9" />
				</div>
				<h3 className="text-2xl font-bold">
					{showPasswordChangedSuccessful ? 'Password Reset Successful' : 'Create New Password'}
				</h3>
				<p className="text-typography-500">
					{showPasswordChangedSuccessful
						? 'Your password has been successfully reset. Click below to log in.'
						: 'Please make sure to remember your new password'}
				</p>
			</div>
			{!showPasswordChangedSuccessful ? (
				<Fragment>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col items-center">
							<div className="w-full flex flex-col gap-5">
								<div>
									<label htmlFor="password" className="input-label">
										New Password
									</label>
									<input
										type="password"
										id="password"
										{...register('newPassword')}
										className={`${
											errors.newPassword ? '!outline-red-600' : ''
										} input input-box-shadow`}
										placeholder="Enter"
									/>
									{errors.newPassword && (
										<p className="text-red-600 text-sm mt-1">{errors.newPassword.message}</p>
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
						<button type="submit" className="my-8 primary-btn w-full" disabled={isPending}>
							Next
						</button>
					</form>
				</Fragment>
			) : (
				<button className="my-8 primary-btn w-full" onClick={() => navigate(LOGIN_ROUTE)}>
					Continue
				</button>
			)}
		</Fragment>
	);
};
