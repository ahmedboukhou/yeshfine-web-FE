import { create } from 'zustand';

interface AuthStore {
	token: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;

	refreshPromise: Promise<string> | null;
	setToken: (token: string, refreshToken?: string) => void;
	refreshAccessToken: () => Promise<string>;

	loginUser: (token: string, refreshToken: string) => void;
	logout: () => void;
	checkLoggedIn: () => void;
}

const useAuthStore = create<AuthStore>((set, get) => ({
	token: null,
	refreshToken: null,
	isAuthenticated: false,
	refreshPromise: null,

	setToken: (token, refreshToken) => {
		localStorage.setItem('token', token);
		if (refreshToken) {
			localStorage.setItem('refresh_token', refreshToken);
		}
		set({
			token,
			refreshToken: refreshToken ?? get().refreshToken,
			isAuthenticated: true,
		});
	},

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
		localStorage.removeItem('specialties');
		localStorage.removeItem('lab_tests');
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

	refreshAccessToken: async () => {
		const { refreshPromise } = get();
		if (refreshPromise) {
			return refreshPromise;
		}

		const refreshToken = get().refreshToken || localStorage.getItem('refresh_token');
		if (!refreshToken) {
			throw new Error('No refresh token available');
		}

		const promise = (async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}auth/refresh-token`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ refreshToken }),
				});

				if (!res.ok) {
					throw new Error(`Failed to refresh token: ${res.status}`);
				}

				const data = await res.json();
				const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data?.data || {};

				if (!newAccessToken) {
					throw new Error('No token received');
				}

				get().setToken(newAccessToken, newRefreshToken);
				return newAccessToken;
			} finally {
				set({ refreshPromise: null });
			}
		})();

		set({ refreshPromise: promise });
		return promise;
	},
}));

export default useAuthStore;
