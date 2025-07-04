import { create } from 'zustand';

interface AuthStore {
	token: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;

	loginUser: (token: string, refreshToken: string) => void;
	logout: () => void;
	checkLoggedIn: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
	token: null,
	refreshToken: null,
	isAuthenticated: false,

	loginUser: (token, refreshToken) => {
		localStorage.setItem('token', token);
		localStorage.setItem('refresh_token', refreshToken);

		set({
			token,
			refreshToken,
			isAuthenticated: true,
		});
	},

	logout: () => {
		localStorage.removeItem('token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('current_user');
		set({
			token: null,
			refreshToken: null,
			isAuthenticated: false,
		});
	},

	checkLoggedIn: () => {
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
