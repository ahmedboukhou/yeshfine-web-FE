import type { FC } from 'react';
import { WhiteCheckIcon } from '../../../assets/icons';

interface StepperProps {
	steps: string[];
	currentStep: number; // 1-based index
}
export const Stepper: FC<StepperProps> = ({ steps, currentStep }) => {
	return (
		<ul className="relative flex justify-center items-center gap-x-2">
			{steps.map((label, idx) => {
				const stepNumber = idx + 1;
				const isCompleted = stepNumber < currentStep;
				const isCurrent = stepNumber === currentStep;

				return (
					<li key={label} className="shrink-0 flex items-center group">
						<div>
							<div className="inline-flex items-center text-xs">
								{/* Circle */}
								<p
									className={`size-7 flex justify-center items-center rounded-full border-2 ${
										isCompleted
											? 'bg-primary text-white border-2 border-primary-light-active'
											: isCurrent
											? 'border-2 border-primary-light-active text-primary bg-primary'
											: 'border-typography-600 text-typography-600'
									}`}
								>
									{isCompleted ? (
										<WhiteCheckIcon />
									) : isCurrent ? (
										<span className="w-2 h-2 bg-white rounded-full"></span>
									) : (
										<span className="w-2 h-2 bg-typography-600 rounded-full"></span>
									)}
								</p>

								{/* Connector */}
								{idx < steps.length - 1 && (
									<div
										className={`ms-2 h-0.5 w-13 sm:w-30 ${
											stepNumber < currentStep ? 'bg-primary' : 'bg-typography-600'
										}`}
									></div>
								)}
							</div>
							<div className="w-5 text-wrap mt-1 text-center">
								<span
									className={`${
										isCompleted
											? 'text-primary font-medium'
											: isCurrent
											? 'text-primary font-bold'
											: ''
									}`}
								>
									{label}
								</span>
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
};
