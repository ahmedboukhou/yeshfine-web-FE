import { memo, useEffect, useState, type FC } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { useTranslation } from 'react-i18next';
import { BackIcon, SearchIcon, WhiteRightArrowIcon } from '../../../assets/icons';
import {
	usePatientUpdateAddressMutation,
	type PatientUpdateAddressInput,
} from '../../../apis/patient/profile';
import { toast } from 'react-toastify';
import { useCurrentUserStore } from '../../../store/user';

type AddressModalProps = {
	id: string;
};

const AddressModal: FC<AddressModalProps> = ({ id }) => {
	const { t } = useTranslation();
	const { mutateAsync: updateAddress, isPending } = usePatientUpdateAddressMutation();
	const [address, setAddress] = useState<PatientUpdateAddressInput>();
	const { currentUser } = useCurrentUserStore((state) => state);
	console.log('🚀 ~ AddressModal ~ address:', address);

	useEffect(() => {
		if (window.HSStaticMethods?.autoInit) {
			window.HSStaticMethods.autoInit();
		}
	}, []);

	const handleUpdateAddress = () => {
		if (!address) {
			toast.error(t('Please select an address'));
			return;
		}

		updateAddress(address, { onSuccess: ({ message }) => toast.success(message) }).catch(
			(error) => {
				toast.error(error.message || t('Something went wrong'));
			}
		);
	};

	return (
		<div
			id={`hs-${id}`}
			className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none"
			role="dialog"
			tabIndex={-1}
			aria-labelledby={`hs-${id}-label`}
		>
			<div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-56px)] flex items-center">
				<div className="w-full flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto ">
					<div className="flex-items-center gap-2 p-5">
						<div>
							<BackIcon />
						</div>
						<div className="flex-1">
							<div className={`relative w-full`}>
								<Autocomplete
									className="py-3 px-4 ps-11 block w-full border-border-1 rounded-xl text-sm focus:z-10 focus:border-primary focus:ring-primary"
									apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
									defaultValue={currentUser?.address || ''}
									onPlaceSelected={(place) => {
										const addressComponents = place?.address_components || [];

										const getComponent = (type: string) =>
											addressComponents.find((component: { types: string[] }) =>
												component.types.includes(type)
											)?.long_name;

										const city = getComponent('locality');
										const state = getComponent('administrative_area_level_1');
										const country = getComponent('country');
										setAddress({
											address: place?.formatted_address,
											city: city || '',
											state: state || '',
											country: country || '',
											latitude: place?.geometry?.location?.lat(),
											longitude: place?.geometry?.location?.lng(),
											zipCode: '',
										});
									}}
								/>
								<div className="absolute inset-y-0 start-0 flex-items-center pointer-events-none z-20 ps-4 mt-1">
									<SearchIcon />
								</div>
							</div>
						</div>
						<div>
							<button className="primary-btn" onClick={handleUpdateAddress} disabled={isPending}>
								<WhiteRightArrowIcon />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(AddressModal);
