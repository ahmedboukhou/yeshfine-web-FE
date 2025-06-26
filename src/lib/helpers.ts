export function maskPhoneNumber(phone: string) {
	const visibleStart = phone.slice(0, 6);
	const visibleEnd = phone.slice(-2);
	const maskedSection = '*'.repeat(phone.length - 8);

	return visibleStart + maskedSection + visibleEnd;
}
