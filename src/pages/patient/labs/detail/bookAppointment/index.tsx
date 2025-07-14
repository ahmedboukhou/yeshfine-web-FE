import { useLocation } from 'react-router';

export const PatientLabBookAppointment = () => {
	const { state } = useLocation();
	console.log('🚀 ~ PatientLabBookAppointment ~ state:', state);
	const { name, price, description, result_time, pre_test_instructions, requires_prescription } =
		state;
	console.log(
		`🚀 ~ PatientLabBookAppointment ~ { name, price, description, result_time, pre_test_instructions, requires_prescription }:`,
		{ name, price, description, result_time, pre_test_instructions, requires_prescription }
	);

	return <div>LabBookAppointment</div>;
};
