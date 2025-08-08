import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NoInformationCard } from '../../../../components/ui/cards/NoInformationCard';
import { useCurrentUserStore } from '../../../../store/user';
import { daysOfWeek } from '../../../../constants';
import ticketIcon from '../../../../assets/icons/ticket.svg';
import slotIcon from '../../../../assets/icons/time-slot.svg';

export const dayKeyMap: Record<string, string> = {
	sunday: 'sun',
	monday: 'mon',
	tuesday: 'tue',
	wednesday: 'wed',
	thursday: 'thu',
	friday: 'fri',
	saturday: 'sat',
};

export const LabAvailabilityViewProfile = () => {
	const { t } = useTranslation();
	const { currentUser } = useCurrentUserStore((state) => state);
	const availability = currentUser?.availability;

	const isAllDaysEmpty =
		availability &&
		Object.values(availability).every((day) => Array.isArray(day) && day.length === 0);

	const [selectedDay, setSelectedDay] = useState<string>('sunday');
	const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

	if (isAllDaysEmpty) return <NoInformationCard />;

	const selectedKey = dayKeyMap[selectedDay]; // 'sun', 'mon', etc.
	const selectedDaySlots = availability?.[selectedKey] || [];

	return (
		<div className="space-y-4">
			{/* Day Buttons */}
			<div className="flex flex-wrap gap-4">
				{daysOfWeek.map((day) => (
					<button
						key={day}
						onClick={() => {
							const key = dayKeyMap[day];
							const slots = availability?.[key] || [];

							setSelectedDay(day);
							setSelectedSlotIndex(slots.length > 0 ? 0 : null);
						}}
						className={`px-4 py-3 rounded-lg uppercase ${
							selectedDay === day
								? 'bg-primary text-white'
								: 'border border-primary text-typography-700'
						}`}
					>
						{t(day)}
					</button>
				))}
			</div>

			<div className="mt-6 card card-box-shadow-3">
				{/* Slots for Selected Day */}
				{selectedDaySlots.length > 0 ? (
					<div className="flex-items-center flex-wrap gap-3 ">
						<div>
							<img src={slotIcon} alt="slot-icon" className="p-3 bg-primary-light rounded-full" />
						</div>
						<div>
							<span className="text-typography-500">{t('timeSlot')}</span>
							<div className="flex-items-center gap-3">
								{selectedDaySlots.map((slot: any, index: number) => (
									<div className="flex flex-col gap-1">
										<div className="flex gap-3 flex-wrap">
											<button
												key={index}
												onClick={() => setSelectedSlotIndex(index)}
												className={`px-4 py-2 rounded-full ${
													selectedSlotIndex === index
														? 'bg-primary text-white'
														: ' border border-border-1'
												}`}
											>
												{slot.start} - {slot.end}
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				) : (
					<p className="text-typography-500">{t('noSlotsAvailable')}</p>
				)}

				{/* Tickets */}
				{selectedSlotIndex !== null && selectedDaySlots[selectedSlotIndex] && (
					<div className="flex-items-center gap-3 mt-5">
						<img src={ticketIcon} alt="ticket-icon" className="p-3 bg-primary-light rounded-full" />
						<div className="flex flex-col gap-1">
							<span className="text-typography-500">{t('numberOfTickets')}</span>
							<span className="text-typography-800">
								{selectedDaySlots[selectedSlotIndex].tickets}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
