import GoogleMapReact from 'google-map-react';
import type { FC } from 'react';

export const GoogleMap: FC<{ latitude?: number; longitude?: number }> = ({ latitude, longitude }) =>
	latitude &&
	longitude && (
		<GoogleMapReact
			bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAP_API_KEY }}
			defaultCenter={{
				lat: latitude,
				lng: longitude,
			}}
			defaultZoom={11}
		/>
	);
