import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import useAuthStore from './store/auth';
import { AppRoutes } from './routes';

async function loadPreline() {
	return import('preline/dist/index.js');
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 2,
		},
	},
});

export const App = () => {
	useEffect(() => {
		const initPreline = async () => {
			await loadPreline();

			if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
				window.HSStaticMethods.autoInit();
			}
		};

		initPreline();
	}, [location.pathname]);

	useAuthStore.getState().checkLoggedIn();

	return (
		<main className="font-display">
			<QueryClientProvider client={queryClient}>
				<AppRoutes />
				<ToastContainer
					position="top-right"
					autoClose={3000}
					limit={4}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable={false}
					pauseOnHover
					theme="light"
					transition={Slide}
				/>
			</QueryClientProvider>
		</main>
	);
};
