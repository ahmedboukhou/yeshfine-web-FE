import { useTranslation } from 'react-i18next';
import ChangePasswordModal from './modals/ChangePasswordModal';

export const ChangePassword = () => {
	const { t } = useTranslation();
	const modalId = 'abc';
	return (
		<div className="flex-between gap-3 flex-col sm:flex-row">
			<div>
				<h3 className="text-typography-800 font-semibold">{t('changePassword')}</h3>
				<p className="text-typography-600 font-medium">{t('changePasswordInfo')}</p>
			</div>
			<div>
				<button
					aria-haspopup="dialog"
					aria-expanded="false"
					aria-controls={`hs-${modalId}`}
					data-hs-overlay={`#hs-${modalId}`}
					className="primary-btn text-nowrap"
				>
					{t('changePassword')}
				</button>
			</div>
			<ChangePasswordModal id={modalId} />
		</div>
	);
};
