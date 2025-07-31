import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import cart from '../../../assets/images/cart.png';
import { PHARMACIES_ROUTE } from '../../../routes';

export const CartEmpty = () => {
	const { t } = useTranslation('patient');
	return (
		<section className="min-h-[calc(100vh-20rem)] bg-white flex-center">
			<div className="flex-center flex-col gap-4 text-center">
				<div className="size-25 bg-primary-light rounded-full p-4">
					<img src={cart} alt="cart" />
				</div>

				<div className="space-y-6">
					<h3 className="text-typography-800 font-medium mb-2">{t('cartEmpty')}</h3>
					<div>
						<p className="text-typography-700 font-medium">{t('cartEmptyMessage')}</p>
						<p className="text-typography-700 font-medium">{t('cartExplorePrompt')}</p>
					</div>
					<div>
						<Link to={PHARMACIES_ROUTE} className="primary-btn">
							{t('browse')}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
