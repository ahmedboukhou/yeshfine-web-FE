import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { MainLayout } from './components/layouts/main';
import { Role } from './interfaces/enums';
import { AuthLayout } from './pages/auth';
import { ForgotPassword } from './pages/auth/forgotPassword';
import { Login } from './pages/auth/Login';
import { SelectLanguage } from './pages/auth/SelectLanguage';
import { Signup } from './pages/auth/signup';
import { DoctorAppointments } from './pages/doctor/appointments';
import { DoctorHome } from './pages/doctor/home';
import { DoctorProfile } from './pages/doctor/profile';
import { DoctorRevenue } from './pages/doctor/revenue';
import { PatientAppointments } from './pages/patient/appointments';
import { PatientAppointmentDetails } from './pages/patient/appointments/details';
import { PatientCart } from './pages/patient/cart';
import { PatientDoctors } from './pages/patient/doctors';
import { PatientDoctorDetail } from './pages/patient/doctors/detail';
import { PatientDoctorBookAppointment } from './pages/patient/doctors/detail/bookAppointment';
import { PatientHome } from './pages/patient/home';
import { PatientLabs } from './pages/patient/labs';
import { PatientLabDetail } from './pages/patient/labs/detail';
import { PatientLabBookAppointment } from './pages/patient/labs/detail/BookAppointment';
import { PatientLabReportDetail } from './pages/patient/labs/reports/details';
import { PatientNotifications } from './pages/patient/notifications';
import { PatientPharmacies } from './pages/patient/pharmacies';
import { PatientPharmaciesDetail } from './pages/patient/pharmacies/detail';
import { PatientMedicineCategories } from './pages/patient/pharmacies/detail/MedicineCategories';
import { PatientMedicineDetails } from './pages/patient/pharmacies/detail/medicineDetails';
import { PatientProfile } from './pages/patient/profile';
import useAuthStore from './store/auth';
import { useCurrentUserStore } from './store/user';

// App Routes
export const ROOT_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const LANGUAGE_ROUTE = '/select-language';
export const FORGOT_PASSWORD_ROUTE = '/forgot-password';
export const SIGNUP_ROUTE = '/signup';

export const HOME_ROUTE = '/home';

// patient routes
export const DOCTORS_ROUTE = '/doctors';
export const DOCTORS_DETAIL_ROUTE = `${DOCTORS_ROUTE}/:id`;
export const DOCTOR_BOOK_APPOINTMENT_ROUTE = `${DOCTORS_ROUTE}/:id/book-appointment`;
export const LABS_ROUTE = '/labs';
export const LABS_REPORT_DETAIL_ROUTE = '/labs/reports/:id';
export const LABS_DETAIL_ROUTE = `${LABS_ROUTE}/:id`;
export const LAB_BOOK_APPOINTMENT_ROUTE = `${LABS_ROUTE}/:id/book-appointment`;
export const PHARMACIES_ROUTE = '/pharmacies';
export const PHARMACIES_DETAIL_ROUTE = `${PHARMACIES_ROUTE}/:id`;
export const PHARMACIES_MEDICINE_CATEGORY_ROUTE = `${PHARMACIES_ROUTE}/:id/medicines`;
export const PHARMACIES_MEDICINE_DETAIL_ROUTE = `/medicines/:id`;
export const APPOINTMENTS_ROUTE = '/appointments';
export const CART_ROUTE = '/cart';
export const APPOINTMENTS_DETAIL_ROUTE = `${APPOINTMENTS_ROUTE}/:id`;
export const PROFILE_ROUTE = `profile`;
export const REVENUE_ROUTE = `revenue`;
export const NOTIFICATIONS_ROUTE = `notifications`;

export const AppRoutes = () => {
	const { isAuthenticated, logout } = useAuthStore((state) => state);
	const { currentUser } = useCurrentUserStore((state) => state);

	return (
		<BrowserRouter>
			{isAuthenticated && currentUser ? (
				<Routes>
					{currentUser.role === Role.Patient && (
						<Route element={<MainLayout />}>
							{/* home */}
							<Route element={<PatientHome />} path={HOME_ROUTE} />

							{/* doctors */}
							<Route element={<PatientDoctors />} path={DOCTORS_ROUTE} />
							<Route element={<PatientDoctorDetail />} path={DOCTORS_DETAIL_ROUTE} />
							<Route
								element={<PatientDoctorBookAppointment />}
								path={DOCTOR_BOOK_APPOINTMENT_ROUTE}
							/>

							{/* labs */}
							<Route element={<PatientLabs />} path={LABS_ROUTE} />
							<Route element={<PatientLabDetail />} path={LABS_DETAIL_ROUTE} />
							<Route element={<PatientLabReportDetail />} path={LABS_REPORT_DETAIL_ROUTE} />
							<Route element={<PatientLabBookAppointment />} path={LAB_BOOK_APPOINTMENT_ROUTE} />

							{/* pharmacies */}
							<Route element={<PatientPharmacies />} path={PHARMACIES_ROUTE} />
							<Route element={<PatientPharmaciesDetail />} path={PHARMACIES_DETAIL_ROUTE} />
							<Route
								element={<PatientMedicineCategories />}
								path={PHARMACIES_MEDICINE_CATEGORY_ROUTE}
							/>
							<Route element={<PatientCart />} path={CART_ROUTE} />
							<Route element={<PatientMedicineDetails />} path={PHARMACIES_MEDICINE_DETAIL_ROUTE} />

							{/* appointments */}
							<Route element={<PatientAppointments />} path={APPOINTMENTS_ROUTE} />
							<Route element={<PatientAppointmentDetails />} path={APPOINTMENTS_DETAIL_ROUTE} />

							{/* profile */}
							<Route element={<PatientProfile />} path={PROFILE_ROUTE} />
							<Route element={<PatientNotifications />} path={NOTIFICATIONS_ROUTE} />

							<Route element={<Navigate to={HOME_ROUTE} />} path="*" />
						</Route>
					)}

					{currentUser.role === Role.Doctor && (
						<Route element={<MainLayout />}>
							{/* home */}
							<Route element={<DoctorHome />} path={HOME_ROUTE} />
							<Route element={<DoctorAppointments />} path={APPOINTMENTS_ROUTE} />
							<Route element={<DoctorRevenue />} path={REVENUE_ROUTE} />
							<Route element={<DoctorProfile />} path={PROFILE_ROUTE} />

							<Route element={<PatientNotifications />} path={NOTIFICATIONS_ROUTE} />

							<Route element={<Navigate to={HOME_ROUTE} />} path="*" />
						</Route>
					)}

					{currentUser.role !== Role.Patient && currentUser.role !== Role.Doctor && (
						<Route>
							<Route
								path={HOME_ROUTE}
								element={
									<main className="flex-center h-screen">
										<div className="text-center">
											<p>Development in progress, Please login with patient or doctor role</p>
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
						<Route element={<SelectLanguage />} path={ROOT_ROUTE} />
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
