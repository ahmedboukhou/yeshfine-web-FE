import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useEffect, type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useChangePasswordMutation } from '../../../apis/auth';
import lockImg from '../../../assets/images/lock.png';
import type { UpdatePasswordInput } from '../../../interfaces/formInputTypes';
import { resetPasswordSchema } from '../../../validations';
import { InputField } from '../inputs/InputField';
import { toast } from 'react-toastify';

type AddressModalProps = {
	id: string;
};

declare global {
	interface Window {
		HSOverlay?: {
			close: (element: Element) => void;
		};
	}
}

const defaultValues: UpdatePasswordInput = {
	currentPassword: '',
	newPassword: '',
};

const ChangePasswordModal: FC<AddressModalProps> = ({ id }) => {
	const { t } = useTranslation(['common', 'auth', 'validations']);

	const { mutateAsync: updatePassword, isPending } = useChangePasswordMutation();
	useEffect(() => {
		if (window.HSStaticMethods?.autoInit) {
			window.HSStaticMethods.autoInit();
		}
	}, []);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpdatePasswordInput>({
		resolver: yupResolver(resetPasswordSchema(t)),
		mode: 'all',
		defaultValues,
	});

	const onSubmit: SubmitHandler<UpdatePasswordInput> = async ({ currentPassword, newPassword }) => {
		updatePassword(
			{ currentPassword, newPassword },
			{
				onSuccess: ({ message }) => {
					toast.success(message);
					reset();
					const modalEl = document.querySelector(`#hs-${id}`);
					if (modalEl && window.HSOverlay?.close) {
						window.HSOverlay.close(modalEl);
					}
				},
			}
		);
	};

	return (
		<div
			id={`hs-${id}`}
			className="hs-overlay hidden  size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none"
			role="dialog"
			tabIndex={-1}
			aria-labelledby={`hs-${id}-label`}
		>
			<div className="hs-overlay-open:mt-7  hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto min-h-[calc(100%-56px)] flex items-center">
				<div className="w-full flex flex-col bg-white p-5 shadow-2xs rounded-xl pointer-events-auto ">
					<div className="flex-center flex-col text-center">
						<div className="size-20 bg-primary-light rounded-full flex-center mb-6">
							<img src={lockImg} alt="lock img" />
						</div>

						<div className="mb-8">
							<h4 className="text-typography-800 font-semibold">{t('changePassword')}</h4>
							<p className="text-typography-700 font-medium">{t('enterCurrentNewPassword')}</p>
						</div>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-5">
							<InputField
								label={t('currentPassword')}
								id="currentPassword"
								type="password"
								error={errors.currentPassword}
								register={register('currentPassword')}
							/>
							<InputField
								label={t('newPassword', { ns: 'auth' })}
								id="newPassword"
								type="password"
								error={errors.newPassword}
								register={register('newPassword')}
							/>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
								<button
									type="button"
									data-hs-overlay={`#hs-${id}`}
									className="outlined-btn w-full"
									disabled={isPending}
								>
									{t('cancel')}
								</button>
								<button type="submit" className="primary-btn w-full" disabled={isPending}>
									{t('save')}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default memo(ChangePasswordModal);
