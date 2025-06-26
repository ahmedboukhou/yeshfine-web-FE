import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthLayout } from '../pages/auth';
import { ForgotPassword } from '../pages/auth/forgotPassword';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/signup';
import { PatientLayout } from '../pages/patient';
import { PatientDashboard } from '../pages/patient/dashboard';
import useAuthStore from '../store/auth';

// App Routes
export const LOGIN_ROUTE = '/login';
export const FORGOT_PASSWORD_ROUTE = '/forgot-password';
export const SIGNUP_ROUTE = '/signup';

export const DASHBOARD_ROUTE = '/dashboard';

export const AppRoutes = () => {
	const { isAuthenticated } = useAuthStore((state) => state);

	return (
		<BrowserRouter>
			{isAuthenticated ? (
				<Routes>
					<Route element={<PatientLayout />}>
						<Route element={<PatientDashboard />} path={DASHBOARD_ROUTE} />
						<Route element={<Navigate to={DASHBOARD_ROUTE} />} path="*" />
					</Route>
				</Routes>
			) : (
				<Routes>
					<Route element={<AuthLayout />}>
						<Route element={<Login />} path={LOGIN_ROUTE} />
						<Route element={<Signup />} path={SIGNUP_ROUTE} />
						<Route element={<ForgotPassword />} path={FORGOT_PASSWORD_ROUTE} />
						<Route element={<Navigate to={LOGIN_ROUTE} />} path="*" />
					</Route>
				</Routes>
			)}
		</BrowserRouter>
	);
};
