import { useEffect, useState, type KeyboardEvent } from 'react';
import { toast } from 'react-toastify';
import { useResendOTPMutation, useVerifyOTPMutation } from '../../../apis/auth';
import { responseStatus } from '../../../interfaces/enums';
import useAuthStore from '../../../store/auth';
import { useCurrentUserStore } from '../../../store/user';

export function VerifyOTP({ phone }: { phone: string }) {
	const [otp, setOtp] = useState(''.padEnd(6, '')); // String of 6 chars
	const [seconds, setSeconds] = useState(60);

	const { mutateAsync: verifyOtp, isPending } = useVerifyOTPMutation();
	const { mutateAsync: resendOtp, isPending: loadingResendOtp } = useResendOTPMutation();

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

			return () => clearInterval(interval); // Cleanup on unmount
		}
	}, [seconds]);

	const handleVerifyOTP = async () => {
		try {
			const response = (await verifyOtp({ phone, otp })) as any;
			if (response?.status === responseStatus.Success) {
				setCurrentUser(response?.user);
				loginUser(response?.token, 'none');
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleResendOTP = () => {
		resendOtp(
			{ phone },
			{
				onSuccess: () => {
					toast.success('OTP Resent Successfully');
					setSeconds(60);
				},
			}
		);
	};

	return (
		<div>
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
					disabled={seconds > 1 || loadingResendOtp}
					className="link-text"
					onClick={handleResendOTP}
				>
					Send again
				</button>
			</p>
		</div>
	);
}
