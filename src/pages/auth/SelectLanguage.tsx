import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { EmptyCircleIcon, TickIcon } from '../../assets/icons';
import { AuthCard, AuthCardHeading } from '../../components/common/cards/AuthCard';
import { supportedLanguages } from '../../constants/mappedData';
import i18n from '../../i18n';
import { SIGNUP_ROUTE } from '../../routes';

export const SelectLanguage = () => {
	const { t } = useTranslation(['auth', 'common']);
	const navigate = useNavigate();

	const handleChange = useCallback(
		async (value: string) => {
			i18n.changeLanguage(value);
		},
		[i18n]
	);

	return (
		<AuthCard>
			<AuthCardHeading heading={t('selectLanguage')} subHeading={t('chooseLanguagePrompt')} />
			<div>
				<div className="flex flex-col gap-4">
					{supportedLanguages.map(({ title, flag, subTitle, value }) => (
						<div
							key={value}
							onClick={() => handleChange(value)}
							className={`p-6 rounded-lg border cursor-pointer capitalize relative ${
								i18n.language === value
									? ' border-primary bg-primary-light-hover'
									: 'bg-white border-gray-300 text-typography-600 font-medium'
							}`}
						>
							<div className="flex-items-center gap-2">
								<img src={flag} alt={title} />
								<div className="flex-1 flex-between-center">
									<div>
										<span
											className={`!text-sm ${
												i18n.language === value ? 'text-primary font-bold' : ''
											}`}
										>
											{title}
										</span>
										<p className="!text-xs !text-typography-500">{subTitle}</p>
									</div>
									{i18n.language === value ? <TickIcon /> : <EmptyCircleIcon />}
								</div>
							</div>
						</div>
					))}
				</div>
				<button className="mt-8 primary-btn w-full" onClick={() => navigate(SIGNUP_ROUTE)}>
					{t('next', { ns: 'common' })}
				</button>
			</div>
		</AuthCard>
	);
};
