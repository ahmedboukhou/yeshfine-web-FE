import { create } from 'zustand';
import { useCurrentUserStore } from './user';

interface AuthStore {
	token: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;

	setToken: (token: string, refreshToken: string) => void;
	logout: () => void;
	isLoggedIn: () => void;
}

const useAuthStore = create<AuthStore>((set, get) => ({
	token: null,
	refreshToken: null,
	isAuthenticated: false,

	setToken: (token: string, refreshToken: string) => {
		localStorage.setItem('token', token);
		localStorage.setItem('refresh_token', refreshToken);

		set({
			token,
			refreshToken,
			isAuthenticated: true,
		});
	},

	logout: () => {
		const { clearCurrentUser } = useCurrentUserStore.getState();
		clearCurrentUser();

		set({
			token: null,
			refreshToken: null,
			isAuthenticated: false,
		});
	},

	isLoggedIn: () => {
		const token = localStorage.getItem('token');
		const refreshToken = localStorage.getItem('refresh_token');

		if (token && refreshToken) {
			set({
				token,
				refreshToken,
				isAuthenticated: true,
			});
		}
	},
  	// refreshAccessToken: async () => {
	// 	const { refreshPromise } = get();

	// 	if (refreshPromise) {
	// 		return refreshPromise;
	// 	}

	// 	const refreshToken = get().refreshToken || localStorage.getItem('refresh_token');

	// 	if (!refreshToken) {
	// 		throw new Error('No refresh token available');
	// 	}

	// 	const promise = (async () => {
	// 		try {
	// 			const res = await fetch(`${import.meta.env.VITE_API_URL}auth/refresh-token`, {
	// 				method: 'GET',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					Authorization: `Bearer ${refreshToken}`,
	// 				},
	// 			});

	// 			if (!res.ok) {
	// 				throw new Error(`Failed to refresh token: ${res.status}`);
	// 			}

	// 			const data = await res.json();
	// 			const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data?.data || {};

	// 			if (!newAccessToken) {
	// 				throw new Error('No token received');
	// 			}

	// 			get().setToken(newAccessToken, newRefreshToken);
	// 			return newAccessToken;
	// 		} finally {
	// 			set({ refreshPromise: null });
	// 		}
	// 	})();

	// 	set({ refreshPromise: promise });
	// 	return promise;
	// },
}));

export default useAuthStore;
