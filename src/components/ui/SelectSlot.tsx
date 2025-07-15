import { useEffect, type Dispatch, type FC, type SetStateAction } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import type { AppointmentSlotResponse } from '../../interfaces/responseTypes';
import { SlotSkeleton } from './skeletons/SlotSkeleton';

interface SelectSlotProps {
	date: Date;
	setDate: Dispatch<SetStateAction<Date>>;
	useSlotsQuery: (params: { id?: string; appointment_date?: string }) => {
		data?: AppointmentSlotResponse;
		isLoading: boolean;
	};
	selectedSlot: {
		start: string;
		end: string;
	} | null;
	setSelectedSlot: Dispatch<
		SetStateAction<{
			start: string;
			end: string;
		} | null>
	>;
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

	const { available_slots } = data?.data || {};

	const isSelected = (slot: { start: string; end: string }) =>
		selectedSlot?.start === slot.start && selectedSlot?.end === slot.end;

	useEffect(() => {
		if (!isLoading && available_slots?.length && !selectedSlot) {
			setSelectedSlot(available_slots[0]);
		}
	}, [available_slots, isLoading, selectedSlot, setSelectedSlot]);

	return (
		<div>
			<h4 className="text-typography-900 font-semibold mb-6">{t('selectDateTime')}</h4>
			<div className="flex gap-6 flex-col md:flex-row">
				<div>
					<DayPicker
						required
						animate
						mode="single"
						selected={date}
						onSelect={setDate}
						disabled={{ before: new Date() }}
						className="card-gradient border border-border-1 rounded-xl p-2.5 card-box-shadow inline-block"
					/>
					<style>{`
            .rdp-root {
              --rdp-accent-color: #4caf50;
            }
            .rdp-caption_label{color:#3F3F46;
              font-weight:600;
            }
            .rdp-day button{
              color:#52525B;
            }
            .rdp-selected .rdp-day_button {
              background-color: #4caf50;
              color: white !important;
              font-size:14px;
              font-weight:normal
            }
          `}</style>
				</div>
				<div className="flex-1 max-h-78 overflow-auto">
					{isLoading ? (
						<SlotSkeleton />
					) : (
						<div className="grid grid-cols-2 gap-3">
							{!!available_slots?.length ? (
								available_slots.map((slot, index) => {
									const selected = isSelected(slot);
									return (
										<button
											key={index}
											onClick={() => setSelectedSlot(slot)}
											className={`col-span-2 xl:col-span-1 p-3 flex-center rounded-full border w-full font-medium
											${
												selected
													? 'bg-primary-light-active text-primary border-primary'
													: 'bg-gray-200 border-border-1 text-typography-600 hover:bg-gray-200/80'
											}
											        disabled:pointer-events-none disabled:text-typography-600/50 border`}
										>
											{slot.start} - {slot.end}
										</button>
									);
								})
							) : (
								<p className="col-span-2 text-center font-semibold">No slots found!</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
