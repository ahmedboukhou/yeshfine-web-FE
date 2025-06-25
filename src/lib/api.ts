import useAuthStore from '../store/auth';

interface FetchOptions extends RequestInit {
	headers?: Record<string, string>;
}

async function fetchWithRefresh<T>(url: string, options: FetchOptions = {}): Promise<T> {
	const store = useAuthStore.getState();
	let token = store.token || localStorage.getItem('token');

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(token && { Authorization: `Bearer ${token}` }),
		...(options.headers || {}),
	};

	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
			...options,
			headers,
		});

		// if (response.status === 401) {
		// 	try {
		// 		const newToken = await store.refreshAccessToken();

		// 		const newHeaders = {
		// 			...headers,
		// 			Authorization: `Bearer ${newToken}`,
		// 		};

		// 		const retryResponse = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
		// 			...options,
		// 			headers: newHeaders,
		// 		});

		// 		if (!retryResponse.ok) {
		// 			throw new Error(`Request failed with status: ${retryResponse.status}`);
		// 		}

		// 		return retryResponse.json() as Promise<T>;
		// 	} catch {
		// 		store.logout();
		// 		throw new Error('Session expired. Please login again.');
		// 	}
		// }

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw Object.assign(
				new Error(errorData.message || `Request failed with status: ${response.status}`),
				{ status: response.status }
			);
		}

		return response.json() as Promise<T>;
	} catch (err: any) {
		if (err.message === 'Session expired. Please login again.') {
			throw err.message;
		}
		throw { message: err.message, status: err.status };
	}
}

export const apiClient = {
	get: <T>(url: string, params: Record<string, any> = {}): Promise<T> => {
		const queryString = new URLSearchParams(params).toString();
		const fullUrl = queryString ? `${url}?${queryString}` : url;
		return fetchWithRefresh<T>(fullUrl, { method: 'GET' });
	},

	post: <T>(url: string, data: unknown): Promise<T> =>
		fetchWithRefresh<T>(url, {
			method: 'POST',
			body: JSON.stringify(data),
		}),

	put: <T>(url: string, data: unknown): Promise<T> =>
		fetchWithRefresh<T>(url, {
			method: 'PUT',
			body: JSON.stringify(data),
		}),

	delete: <T>(url: string, data: unknown): Promise<T> =>
		fetchWithRefresh<T>(url, {
			method: 'DELETE',
			body: JSON.stringify(data),
		}),

	upload: async (url: string, data: BodyInit, headers?: Record<string, string>): Promise<Response> => {
		const response = await fetch(url, {
			method: 'PUT',
			headers,
			body: data,
		});

		if (!response.ok) throw new Error('Upload failed');
		return response;
	},
};
