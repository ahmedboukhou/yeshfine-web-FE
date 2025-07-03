import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { MainLayout } from './components/layouts/main';
import { Role } from './interfaces/enums';
import { AuthLayout } from './pages/auth';
import { ForgotPassword } from './pages/auth/forgotPassword';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/signup';
import { PatientAppointments } from './pages/patient/appointments';
import { PatientDoctors } from './pages/patient/doctors';
import { PatientHome } from './pages/patient/home';
import { PatientLabs } from './pages/patient/labs';
import { PatientPharmacies } from './pages/patient/pharmacies';
import useAuthStore from './store/auth';
import { useCurrentUserStore } from './store/user';
import { PatientDoctorDetail } from './pages/patient/doctors/detail';

// App Routes
export const LOGIN_ROUTE = '/login';
export const LANGUAGE_ROUTE = '/select-language';
export const FORGOT_PASSWORD_ROUTE = '/forgot-password';
export const SIGNUP_ROUTE = '/signup';

export const HOME_ROUTE = '/home';

// patient routes
export const DOCTORS_ROUTE = '/doctors';
export const LABS_ROUTE = '/labs';
export const PHARMACIES_ROUTE = '/pharmacies';
export const APPOINTMENTS_ROUTE = '/appointments';

export const AppRoutes = () => {
	const { isAuthenticated, logout } = useAuthStore((state) => state);
	const { currentUser } = useCurrentUserStore((state) => state);

	return (
		<BrowserRouter>
			{isAuthenticated && currentUser ? (
				<Routes>
					{currentUser.role === Role.Patient ? (
						<Route element={<MainLayout />}>
							<Route element={<PatientHome />} path={HOME_ROUTE} />
							<Route element={<PatientDoctors />} path={DOCTORS_ROUTE} />
							<Route element={<PatientDoctorDetail />} path={`${DOCTORS_ROUTE}/:id`} />
							<Route element={<PatientLabs />} path={LABS_ROUTE} />
							<Route element={<PatientPharmacies />} path={PHARMACIES_ROUTE} />
							<Route element={<PatientAppointments />} path={APPOINTMENTS_ROUTE} />
							<Route element={<Navigate to={HOME_ROUTE} />} path="*" />
						</Route>
					) : (
						<Route>
							<Route
								path={HOME_ROUTE}
								element={
									<main className="flex-center h-screen">
										<div className="text-center">
											<p>Development in progress, Please login with patient role</p>
											<button onClick={logout} className="primary-btn mt-3">
												Logout
											</button>
										</div>
									</main>
								}
							/>
							<Route element={<Navigate to={HOME_ROUTE} />} path="*" />
						</Route>
					)}
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
