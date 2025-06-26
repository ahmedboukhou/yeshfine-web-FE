import { Outlet } from 'react-router';
import useAuthStore from '../../store/auth';

export const PatientLayout = () => {
	const { logout } = useAuthStore((state) => state);
	return (
		<main>
			<div className="">
				Patient Dashboard in progress
				<div>
					<button onClick={logout} className="primary-btn">
						Logout
					</button>
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</main>
	);
};
