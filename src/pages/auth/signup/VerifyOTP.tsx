import { useEffect, useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useResendOTPQuery, useVerifyOTPMutation } from '../../../apis/auth';
import { AuthCardHeading } from '../../../components/ui/cards/AuthCard';
import { responseStatus } from '../../../interfaces/enums';
import { maskPhoneNumber } from '../../../lib/helpers';
import useAuthStore from '../../../store/auth';
import { useCurrentUserStore } from '../../../store/user';

export function VerifyOTP({
	phone,
	isForgotPassword = false,
	setShowCreatePasswordForm,
}: {
	phone: string;
	isForgotPassword?: boolean;
	setShowCreatePasswordForm?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { t } = useTranslation(['auth', 'common']);

	const [otp, setOtp] = useState(''.padEnd(6, '')); // String of 6 chars
	const [seconds, setSeconds] = useState(60);

	// APIs for signup flow
	const { mutateAsync: verifyOtp, isPending } = useVerifyOTPMutation();
	const { refetch: resendOtp, isLoading: loadingResendOtp } = useResendOTPQuery({ phone });

	// APIs for reset password flow

	const { loginUser } = useAuthStore((state) => state);
	const { setCurrentUser } = useCurrentUserStore((state) => state);

	const handleInputChange = (index: number, value: string) => {
		if (value.match(/^[0-9]?$/)) {
			let newOTP = otp.split('');
			newOTP[index] = value;
			const updatedOTP = newOTP.join('');
			setOtp(updatedOTP);

			// Move to next input
			if (value && index < 5) {
				(
					document.querySelector(
						`input[data-hs-pin-input-item]:nth-child(${index + 2})`
					) as HTMLInputElement | null
				)?.focus();
			}
		}
	};

	const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			(
				document.querySelector(
					`input[data-hs-pin-input-item]:nth-child(${index})`
				) as HTMLInputElement | null
			)?.focus();
		}
	};

	useEffect(() => {
		if (seconds > 1) {
			const interval = setInterval(() => {
				setSeconds((prev) => prev - 1);
			}, 1000);

			return () => {
				clearInterval(interval);
			}; // Cleanup on unmount
		}
	}, [seconds]);

	const handleVerifyOTP = () => {
		verifyOtp(
			{ phone, otp },
			{
				onSuccess: ({ status, data }) => {
					if (status === responseStatus.Success) {
						if (isForgotPassword && setShowCreatePasswordForm) {
							setShowCreatePasswordForm(true);
						} else {
							setCurrentUser(data.user);
							loginUser(data.token, data.refreshToken);
						}
					}
				},
			}
		);
	};

	const handleResendOTP = async () => {
		try {
			const response = (await resendOtp()) as any;
			if (response?.status === responseStatus.Success) {
				setSeconds(60);
				toast.success('OTP Resent Successfully');
			}
		} catch (error) {
			console.log('Something Went Wrong');
		}
	};

	return (
		<div>
			<AuthCardHeading
				heading={t('codeSent')}
				subHeading={`${t('otpSentMessage', { phone: phone && maskPhoneNumber(phone) })}`}
			/>
			<div
				className="flex gap-3 justify-center flex-wrap"
				data-hs-pin-input='{
        "availableCharsRE": "^[0-9]+$"
      }'
			>
				{Array.from({ length: 6 }).map((_, index) => (
					<input
						key={index}
						value={otp[index] ?? ''}
						className="block w-12 text-center border-gray-200 rounded-md text-3xl font-semibold focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
						data-hs-pin-input-item=""
						onChange={(e) => handleInputChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						maxLength={1}
						type="text"
						inputMode="numeric"
					/>
				))}
			</div>
			<div className="my-8">
				{seconds > 1 && (
					<p className="text-center text-typography-600 text-sm">{seconds} Seconds</p>
				)}
			</div>
			<button
				className="mb-8 primary-btn w-full"
				disabled={otp.length !== 6 || isPending}
				onClick={handleVerifyOTP}
			>
				Verify OTP
			</button>
			<p className="text-sm text-center">
				Didn't get a text?{' '}
				<button
					className="link-text"
					disabled={seconds > 2 || loadingResendOtp}
					onClick={handleResendOTP}
				>
					{loadingResendOtp ? 'Sending' : 'Send again'}
				</button>
			</p>
		</div>
	);
}
