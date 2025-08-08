import { type Dispatch, type FC, type SetStateAction } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BlackPlusIcon, CrossIcon } from '../../../../assets/icons';
import { InputField } from '../../../../components/ui/inputs/InputField';
import { daysOfWeek } from '../../../../constants';

type TimeSlot = {
	startTime: string;
	endTime: string;
	ticketNumber: string;
};

type FormValues = {
	availability: {
		day: string;
		isAvailable: boolean;
		slots: TimeSlot[];
	}[];
};

type DoctorEditProfileAvailabilityProfile = {
	setStep: Dispatch<SetStateAction<number>>;
};

export const DoctorEditAvailabilityProfile: FC<DoctorEditProfileAvailabilityProfile> = ({
	setStep,
}) => {
	const { t } = useTranslation();
	const {
		control,
		register,
		watch,
		formState: { errors },
	} = useFormContext<FormValues>();

	const watchAvailability = watch('availability') || [];

	return (
		<div>
			<span className="text-typography-800">{t('weeklyApplicationNote')}</span>
			<div className="space-y-8 mt-2">
				{daysOfWeek.map((day, dayIndex) => {
					const isAvailable = watchAvailability?.[dayIndex]?.isAvailable;
					const { fields, append, remove } = useFieldArray({
						control,
						name: `availability.${dayIndex}.slots`,
					});

					return (
						<div key={day} className="space-y-2">
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										{...register(`availability.${dayIndex}.isAvailable`, {
											onChange: (e) => {
												const isChecked = e.target.checked;
												const slots = watch(`availability.${dayIndex}.slots`) || [];

												// If checked and no slots, add one
												if (isChecked && slots.length === 0) {
													append({ startTime: '', endTime: '', ticketNumber: '' });
												}
											},
										})}
										id={`availability.${dayIndex}.isAvailable`}
										className="primary-checkbox"
									/>
									<label
										htmlFor={`availability.${dayIndex}.isAvailable`}
										className="font-medium capitalize"
									>
										{t(day)}
									</label>
								</div>

								{isAvailable && (
									<button
										type="button"
										onClick={() => {
											const slots = watch(`availability.${dayIndex}.slots`) || [];
											const lastSlot = slots[slots.length - 1];

											const isLastSlotFilled =
												lastSlot &&
												lastSlot.startTime?.trim() &&
												lastSlot.endTime?.trim() &&
												lastSlot.ticketNumber?.trim();

											if (slots.length === 0 || isLastSlotFilled) {
												append({ startTime: '', endTime: '', ticketNumber: '' });
											}
										}}
										className="flex items-center gap-1 text-sm text-blue-600"
									>
										<BlackPlusIcon />
									</button>
								)}
							</div>

							{isAvailable ? (
								<div className="space-y-2">
									{fields.map((field, index) => (
										<div
											key={field.id}
											className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end relative"
										>
											<InputField
												label={t('startTime')}
												id={`availability.${dayIndex}.slots.${index}.startTime`}
												type="time"
												register={register(`availability.${dayIndex}.slots.${index}.startTime`)}
												error={errors.availability?.[dayIndex]?.slots?.[index]?.startTime}
											/>

											<InputField
												label={t('endTime')}
												id={`availability.${dayIndex}.slots.${index}.endTime`}
												type="time"
												register={register(`availability.${dayIndex}.slots.${index}.endTime`)}
												error={errors.availability?.[dayIndex]?.slots?.[index]?.endTime}
											/>

											<div className="col-span-2 flex items-end gap-3">
												<div className="flex-1">
													<InputField
														label={t('numberOfTickets')}
														id={`availability.${dayIndex}.slots.${index}.ticketNumber`}
														register={register(
															`availability.${dayIndex}.slots.${index}.ticketNumber`
														)}
														error={errors.availability?.[dayIndex]?.slots?.[index]?.ticketNumber}
													/>
												</div>
												{fields.length > 1 && (
													<button
														type="button"
														onClick={() => remove(index)}
														className="text-red-500 pb-3"
														title="Remove slot"
													>
														<CrossIcon />
													</button>
												)}
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-typography-700">{t('unavailable')}</p>
							)}
						</div>
					);
				})}

				<div className="flex-end gap-5 mt-12">
					<button className="outlined-btn" onClick={() => setStep(2)} type="button">
						{t('back')}
					</button>
					<button className="primary-btn" type="submit">
						{t('save')}
					</button>
				</div>
			</div>
		</div>
	);
};
