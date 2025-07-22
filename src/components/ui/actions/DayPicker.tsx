import type { Dispatch, FC, SetStateAction } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

type DatePickerProps = { date: Date; setDate: Dispatch<SetStateAction<Date>> };
export const DatePicker: FC<DatePickerProps> = ({ date, setDate }) => {
	return (
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
	);
};
