export function maskPhoneNumber(phone: string) {
	const visibleStart = phone.slice(0, 6);
	const visibleEnd = phone.slice(-2);
	const maskedSection = '*'.repeat(phone.length - 8);

	return visibleStart + maskedSection + visibleEnd;
}

export function getFileSize(bytes: number) {
	const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	// Round to 1 decimal place, but remove .0 if it's a whole number
	const formattedSize = size % 1 === 0 ? size.toFixed(0) : size.toFixed(1);
	return `${formattedSize}${units[unitIndex]}`;
}

export function toCapitalCase(str: string) {
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => {
			if (word.length === 0) return '';
			return word[0].toUpperCase() + word.slice(1);
		})
		.join(' ');
}
