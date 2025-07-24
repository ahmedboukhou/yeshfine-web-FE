import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router';
import { useGetLabReportDetailQuery } from '../../../../../apis/patient/labs';
import { PDFIcon } from '../../../../../assets/icons';
import calendarIcon from '../../../../../assets/icons/menu-board.svg';
import pendingIcon from '../../../../../assets/icons/pending.svg';
import tickIcon from '../../../../../assets/icons/tick-circle.svg';
import { Badge } from '../../../../../components/ui/Badge';
import { Breadcrumb } from '../../../../../components/ui/Breadcrumb';
import { LabInfoCard } from '../../../../../components/ui/cards/LabInfoCard';
import { GoogleMap } from '../../../../../components/ui/GoogleMap';
import { LocationInfo } from '../../../../../components/ui/LocationInfo';
import { AppointmentDetailsSkeleton } from '../../../../../components/ui/skeletons/AppointmentDetailSkeleton';
import { LabStatusEnum } from '../../../../../interfaces/enums';
import { LABS_ROUTE } from '../../../../../routes';

export const PatientLabReportDetail = () => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation(['common', 'patient']);
	const { state } = useLocation();
	const { data, isLoading } = useGetLabReportDetailQuery({ id });
	const { name, timeRange, address, isOpen, image, latitude, longitude, reportStatus } =
		state || {};
	const { prescription, appointment_date } = data?.data || {};

	const breadcrumbItems = [
		{ title: t('labs'), path: LABS_ROUTE },
		{ title: t('details'), path: '' },
	];

	const reportContext = () => {
		switch (reportStatus) {
			case LabStatusEnum.Pending:
				return {
					heading: 'labReportNotAvailable',
					subHeading: 'labProcessing',
					icon: pendingIcon,
				};

			case LabStatusEnum.Uploaded:
				return {
					heading: 'labReportAvailable',
					subHeading: 'labReportPaymentRequired',
					icon: tickIcon,
				};

			case LabStatusEnum.Paid:
				return {
					heading: 'labReportAvailable',
					subHeading: 'labReadyMessage',
					icon: tickIcon,
				};
		}
	};
  
	return (
		<section>
			<Breadcrumb items={breadcrumbItems} />

			{isLoading ? (
				<AppointmentDetailsSkeleton />
			) : (
				<div className="card space-y-8">
					<LabInfoCard
						name={name}
						isOpen={isOpen}
						image={image}
						timeRange={timeRange}
						address={address}
					/>
					<div>
						<LocationInfo address={address} />
						<div className="h-60 mt-5">
							<GoogleMap latitude={latitude} longitude={longitude} />
						</div>
					</div>

					<div className="p-4 card-box-shadow rounded-lg">
						<div className="flex-between-center mb-5">
							<h5 className="font-semibold text-typography-800">
								{t('scheduleDate', { ns: 'patient' })}
							</h5>
						</div>
						<div className="flex gap-5">
							<div>
								<img src={calendarIcon} className="min-w-12 bg-blue-100 p-2 rounded-lg" />
							</div>
							<div className="flex-1">
								<span className="text-typography-500">{t('appointment', { ns: 'common' })}</span>
								<div className="flex gap-2">
									<p className="font-bold text-typography-900">{appointment_date}</p>
								</div>
							</div>
						</div>
					</div>

					{prescription && (
						<div>
							<Link to={prescription}>
								<div className="p-4 card-box-shadow rounded-lg">
									<div className="flex-between-center mb-5">
										<h5 className="font-semibold text-typography-800">{t('prescription')}</h5>
									</div>
									<div className="flex-items-center gap-5">
										<div>
											<PDFIcon />
										</div>
										<div className="flex-1">
											<span className="text-typography-700">
												{t('viewYourPrescription', { ns: 'patient' })}
											</span>
										</div>
									</div>
								</div>
							</Link>
						</div>
					)}

					<div className="p-4 card-box-shadow rounded-lg space-y-4">
						<div className="flex-between ">
							<h5 className="font-semibold text-typography-800">
								{t('yourReport', { ns: 'patient' })}
							</h5>
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
						</div>

						{(() => {
							const context = reportContext();
							if (!context) return null;
							const { icon, heading, subHeading } = context;
							return (
								<div className="card-gradient-2 flex-center py-4 h-50 border border-border-1 rounded-lg">
									<div className="max-w-xs text-center flex-center flex-col gap-2">
										<div className="flex-center">
											<img src={icon} className="w-10 bg-primary-light-hover rounded-full p-2" />
										</div>
										<p className="text-typography-700 font-semibold">
											{t(heading, { ns: 'patient' })}
										</p>
										<span className="text-typography-700">{t(subHeading, { ns: 'patient' })}</span>
									</div>
								</div>
							);
						})()}
					</div>
				</div>
			)}
		</section>
	);
};
