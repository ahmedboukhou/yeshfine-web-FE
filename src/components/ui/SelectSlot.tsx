import { useEffect, type Dispatch, type FC, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import type { TimeSlot } from '../../interfaces';
import type { AppointmentSlotResponse } from '../../interfaces/responseTypes';
import { SlotSkeleton } from './skeletons/SlotSkeleton';
import { DatePicker } from './actions/DayPicker';

interface SelectSlotProps {
	date: Date;
	setDate: Dispatch<SetStateAction<Date>>;
	useSlotsQuery: (params: { id?: string; appointment_date?: string }) => {
		data?: AppointmentSlotResponse;
		isLoading: boolean;
	};
	selectedSlot: TimeSlot | null;
	setSelectedSlot: Dispatch<SetStateAction<TimeSlot | null>>;
}

export const SelectSlot: FC<SelectSlotProps> = ({
	date,
	setDate,
	setSelectedSlot,
	selectedSlot,
	useSlotsQuery,
}) => {
	const { t } = useTranslation('patient');
	const { id } = useParams<{ id: string }>();

	const { data, isLoading } = useSlotsQuery({
		appointment_date: date.toLocaleDateString(),
		id,
	});

	const { slots } = data?.data || {};

	const isSelected = (slot: { start: string; end: string }) =>
		selectedSlot?.start === slot.start && selectedSlot?.end === slot.end;

	useEffect(() => {
		if (!isLoading && slots?.length && !selectedSlot) {
			const firstSlot = slots[0];
			const firstAvailableTicket = firstSlot.tickets.find((t) => !t.booked)?.number;
			setSelectedSlot({
				...firstSlot,
				selectedTicketNumber: firstAvailableTicket,
			});
		}
	}, [slots, isLoading, selectedSlot, setSelectedSlot]);

	return (
		<div>
			<h4 className="text-typography-900 font-semibold mb-6">{t('selectDateTime')}</h4>
			<div className="flex gap-6 flex-col md:flex-row">
				<DatePicker date={date} setDate={setDate} />
				<div className="flex-1">
					<div className="">
						{isLoading ? (
							<SlotSkeleton />
						) : (
							<div>
								{!!slots?.length ? (
									<div className="space-y-3">
										{/* Slot Selection */}
										<div className="grid grid-cols-2 gap-3 h-40 overflow-auto">
											{slots.map((slot, index) => {
												const selected = isSelected(slot);
												return (
													<div className="col-span-1 xl:col-span-1">
														<button
															key={index}
															onClick={() => {
																const firstAvailableTicket = slot.tickets.find(
																	(t) => !t.booked
																)?.number;
																setSelectedSlot({
																	...slot,
																	selectedTicketNumber: firstAvailableTicket,
																});
															}}
															className={`p-3 flex-center rounded-full border w-full font-medium
                ${
									selected
										? 'bg-primary-light-active text-primary border-primary'
										: 'bg-gray-200 border-border-1 text-typography-600 hover:bg-gray-200/80'
								}
                disabled:pointer-events-none disabled:text-typography-600/50 border`}
														>
															{slot.start} - {slot.end}
														</button>
													</div>
												);
											})}
										</div>

										{/* Ticket Selection for selected slot */}
										{selectedSlot && (
											<div className="space-y-2">
												<h5>{t('tickets', { ns: 'common' })}</h5>
												<div className="flex gap-3 flex-wrap">
													{selectedSlot.tickets.map(({ booked, number }) => (
														<button
															key={number}
															disabled={booked}
															onClick={() =>
																setSelectedSlot({
																	...selectedSlot,
																	selectedTicketNumber: number,
																})
															}
															className={`h-12 w-12 border ${
																booked
																	? 'bg-danger-50 border-danger-200 text-danger-300'
																	: selectedSlot.selectedTicketNumber === number
																	? 'bg-primary border-primary text-white'
																	: 'bg-white border-border-1 text-typography-500 hover:bg-primary-light-hover'
															} rounded-lg disabled:pointer-events-none`}
														>
															{number}
														</button>
													))}
												</div>
											</div>
										)}
									</div>
								) : (
									<p className="col-span-2 text-center font-semibold">
										{t('notFound', { ns: 'patient', text: t('slots', { ns: 'common' }) })}
									</p>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
