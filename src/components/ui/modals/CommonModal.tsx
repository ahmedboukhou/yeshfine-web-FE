import { type ReactNode } from 'react';

export const ModalWrapper = ({ id, children }: { id: string; children: ReactNode }) => {
	return (
		<div
			id={`hs-${id}`}
			className="hs-overlay hidden size-full fixed top-0 start-0 z-60 overflow-x-hidden overflow-y-auto pointer-events-none"
			role="dialog"
			tabIndex={-1}
			aria-labelledby={`hs-${id}-label`}
		>
			<div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
				{children}
			</div>
		</div>
	);
};
