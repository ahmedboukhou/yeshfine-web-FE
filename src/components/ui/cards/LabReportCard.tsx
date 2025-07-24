import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ClockIcon, DownloadIcon, EyeIcon, LocationIcon } from '../../../assets/icons';
import pendingIcon from '../../../assets/icons/pending.svg';
import tickIcon from '../../../assets/icons/tick-circle.svg';
import { LabStatusEnum } from '../../../interfaces/enums';
import { LABS_REPORT_DETAIL_ROUTE } from '../../../routes';
import { Badge } from '../Badge';
import { Distance } from '../Distance';

type LabReportCardProps = {
	reportStatus: LabStatusEnum;
	name: string;
	id: number;
	longitude: number;
	latitude: number;
	address: string;
	image: string;
	timeRange: string;
	distance: number | null;
	isOpen: boolean;
};
export const LabReportCard: FC<LabReportCardProps> = ({
	reportStatus,
	address,
	image,
	id,
	distance,
	isOpen,
	name,
	timeRange,
	latitude,
	longitude,
}) => {
	const { t } = useTranslation(['patient', 'common']);

	const reportMessage = () => {
		switch (reportStatus) {
			case LabStatusEnum.Pending:
				return t('labProcessingMessage');
			case LabStatusEnum.Uploaded:
				return t('reportPaymentRequired');
			case LabStatusEnum.Paid:
				return t('labReadyMessage');
		}
	};

	return (
		<Link
			to={LABS_REPORT_DETAIL_ROUTE.replace(':id', `${id}`)}
			state={{ name, timeRange, address, isOpen, image, latitude, longitude, reportStatus }}
			className="p-4 bg-white rounded-2xl border border-border-1 col-span-12 md:col-span-6 xl:col-span-4"
		>
			<div className="flex gap-2 mb-5">
				<img src={image} alt={name} className="w-20 h-20 rounded-xl" />
				<div className="flex-1 space-y-1">
					<div className="flex-between">
						<h5 className="line-clamp-1 font-semibold text-typography-800">{name}</h5>
						<Distance distance={distance} />
					</div>

					<div className="gap-2 flex-items-center">
						<LocationIcon />
						<span className="text-typography-700">{address}</span>
					</div>

					<div className="flex-items-center gap-1">
						{/* TODO: create separate for is open */}
						<small className={`${isOpen ? 'text-primary' : 'text-typography-500'}`}>
							{t(isOpen ? 'open' : 'closed', { ns: 'common' })}
						</small>
						<Badge icon={<ClockIcon />} specialty={timeRange} variant="primary" />
					</div>
				</div>
			</div>

			<div className="border border-border-1 p-3 rounded-lg flex-between-center gap-2 h-25">
				<div>
					<Badge
						specialty={reportStatus}
						variant={
							reportStatus === LabStatusEnum.Pending
								? 'blue'
								: reportStatus === LabStatusEnum.Uploaded
								? 'warning'
								: 'primary'
						}
					/>
					<small className="line-clamp-3 mt-1">{reportMessage()}</small>
				</div>

				<div className="p-2 bg-primary-light-hover rounded-full shrink-0">
					<img
						src={reportStatus === LabStatusEnum.Pending ? pendingIcon : tickIcon}
						className="w-6"
					/>
				</div>
			</div>

			<div className="mt-4">
				{reportStatus === LabStatusEnum.Paid && (
					<div className="grid grid-cols-2 gap-3">
						<button
							onClick={(e) => e.preventDefault()}
							className="outlined-btn w-full flex-center gap-1"
						>
							<EyeIcon />
							{t('view', { ns: 'common' })}
						</button>
						<button
							onClick={(e) => e.preventDefault()}
							className="primary-btn w-full flex-center gap-1"
						>
							<DownloadIcon />
							{t('download', { ns: 'common' })}
						</button>
					</div>
				)}
				{reportStatus === LabStatusEnum.Uploaded && (
					<button onClick={(e) => e.preventDefault()} className="primary-btn w-full">
						{t('payNow', { ns: 'common' })}
					</button>
				)}
			</div>
		</Link>
	);
};
