import type { LabStatusEnum, LocationEnum, Role } from './enums';

export type DoctorProfile = {
	speciality: string;
	speciality_id: number;
	experience: number;
	liscenceNumber: string;
	clinicName: string | null;
	fee: string;
	biography: string | null;
	availability: WeeklyAvailability;
};
export type AvailabilitySlott = {
	startTime: string;
	endTime: string;
	ticketNumber: string;
};

export type AvailabilityDay = {
	day: string;
	isAvailable: boolean;
	slots: AvailabilitySlott[];
};

export type CurrentUserType = {
	name?: string;
	phone?: string;
	role?: Role;
	address?: string;
	latitude?: number;
	longitude?: number;
	gender?: string;
	image?: string | null;
	dob?: string;
	id?: number;
	city?: string;
	state?: string;
	country?: string;
	zipCode?: string;
	availability?: any;
	profile?: DoctorProfile | null;
};

export interface AvailabilitySlot {
	start: string; // "HH:mm" format
	end: string; // "HH:mm" format
}

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type Availability = {
	[day in Weekday]?: AvailabilitySlot[];
};

export interface DoctorDetail {
	id: number;
	user_id: number;
	speciality: string;
	language: string;
	experience: number;
	biography?: string | null;
	liscenceNumber: string;
	clinicName: string;
	fee: string;
	availability: Availability;
	average_rating: string;
	total_reviews: number;
	createdAt: string;
	updatedAt: string;
}

export interface Doctor {
	id: number;
	name: string;
	phone: string;
	email: string;
	role: string;
	distance: number | null;
	image: string;
	isOtpVerified: boolean;
	isPasswordOtpVerified: boolean;
	dob: string;
	city: string;
	state: string;
	country: string;
	zipCode: string;
	address: string;
	latitude: number;
	longitude: number;
	fcmToken: string | null;
	createdAt: string;
	updatedAt: string;
	doctorDetail: DoctorDetail;
}

export type Lab = {
	id: number;
	name: string;
	address: string;
	isOpen: boolean;
	image: string;
	todaySlot: string;
	distance: null | number;
	labDetail: { id: number; average_rating: string };
};
export type AppointmentType = {
	doctor: {
		id: number;
		name: string;
		image: string;
		average_rating: string;
		speciality: string;
		clinicName: string;
		latitude: number;
		longitude: number;
	};
	appointment_id: number;
	appointment_type: string;
	appointment_type_label: string;
	appointment_date: string; // format: "YYYY-MM-DD"
	appointment_date_formatted: string; // e.g. "18 Jul"
	start_time: string; // format: "HH:mm:ss"
	end_time: string; // format: "HH:mm:ss"
	time_range: string; // e.g. "09:00 AM - 04:00 PM"
	ticket_number: number;
	distance: number | null;
	meeting_link: string | null;
};
export type WeeklyAvailability = {
	sun: AvailabilitySlot[];
	mon: AvailabilitySlot[];
	tue: AvailabilitySlot[];
	wed: AvailabilitySlot[];
	thu: AvailabilitySlot[];
	fri: AvailabilitySlot[];
	sat: AvailabilitySlot[];
};

export type TopDoctor = {
	id: number;
	user_id: number;
	name: string;
	image: string;
	latitude: number;
	longitude: number;
	speciality: string;
	experience: number;
	clinicName: string;
	averageRating: string;
	totalReviews: number;
	distance: number | null;
};

export type TopPharmacy = {
	id: number;
	name: string;
	image: string;
	address: string;
	openingTime: string; // format: "HH:mm:ss"
	closingTime: string; // format: "HH:mm:ss"
	averageRating: string;
	totalReviews: number;
	user_id: number;
	distance: number | null;
	todaySlot: string;
};

export type TopLab = {
	id: number;
	name: string;
	image: string;
	licenseNumber: string;
	address: string;
	averageRating: string;
	user_id: number;
	totalReviews: number;
	distance: number | null;
	open: boolean;
	todaySlot: string;
};

export type DoctorSpecialtiesType = {
	id: number;
	name: string;
};

export type SelectType = {
	label: string;
	value: string;
};

export type Ticket = {
	number: number;
	booked: boolean;
};

export type TimeSlot = {
	start: string; // format: "HH:mm"
	end: string; // format: "HH:mm"
	tickets: Ticket[];
	selectedTicketNumber?: number;
};

export type DoctorReviewType = {
	id: number;
	rating: string;
	review_text: string;
	created_at: string;
	user: { id: number; name: string; image: string };
};

export type LabFilterType = {
	labTestList: DoctorSpecialtiesType[];
	resultTime: 'all' | 'same_day' | 'more_than_2' | 'less_than_2';
	showOpen: boolean;
	location: LocationEnum;
};

export type PharmacyFilterType = {
	showOpen: boolean;
	location: LocationEnum;
};

export type PharmacyDetail = {
	opening_time: string; // "HH:mm:ss"
	closing_time: string; // "HH:mm:ss"
	average_rating: string; // Could also be number if API changes
	total_reviews: number;
};

export type Medicine = {
	id: number;
	name: string;
	category: string;
	unit_price: string; // Could also be number if parsed
	medicine_image: string;
	status: 'in_stock' | 'out_of_stock';
	quantity: number;
	dosage_form: string;
	strength: string;
};

export type Pharmacy = {
	id: number;
	name: string;
	city: string;
	latitude: number;
	longitude: number;
	image: string;
	address: string;
	time_range: string;
	pharmacyDetail: PharmacyDetail;
	medicines: Medicine[];
	distance: number | null;
	is_open: boolean;
};

export type PharmacyInfo = {
	id: number;
	is_open: boolean;
	time_range: string;
	distance: number | null;
	name: string;
	address: string;
	image: string;
	latitude: number;
	longitude: number;
	pharmacyDetail: PharmacyDetail;
};

export type MedicinesByCategory = Record<string, Medicine[]>;

export type MedicineDetail = {
	id: number;
	name: string;
	generic_name: string;
	manufacturer: string;
	strength: string;
	unit_price: string; // could be number if parsed
	medicine_image: string;
	dosage_form: string;
	category: string;
	quantity: number;
	description: string;
};

export type UpcomingAppointmentType = {
	appointment_id: number;
	doctor_id: number;
	doctor_name: string;
	doctor_image: string;
	address: string;
	latitude: number;
	longitude: number;
	appointment_date: string; // e.g., "24 Jul"
	start_time: string; // e.g., "09:00 AM"
	end_time: string; // e.g., "04:00 PM"
	speciality: string;
	experience: number; // in years
	clinicName: string;
	rating: string;
	status: string; // e.g., "scheduled"
	appointment_type: string; // e.g., "In Person"
	meeting_link: string | null;
	distance: number | null;
};

export type LabInfo = {
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	distance: number;
	isOpen: boolean;
	image: string;
	timeRange: string; // e.g., "08:00 AM-08:00 PM"
};

export type LabAppointmentReport = {
	appointment_id: number;
	appointment_date: string; // format: "YYYY-MM-DD"
	report: string | null;
	report_available: boolean;
	total_amount: string; // e.g., "500.00"
	report_status: LabStatusEnum; // e.g., "pending"
	lab: LabInfo;
};

export type PharmacyBasic = {
	id: number;
	name: string;
	address: string;
	image: string;
	pharmacyDetail: PharmacyDetail;
};

export type MedicineFullDetail = MedicineDetail & {
	expiry_date: string; // format: "YYYY-MM-DD"
	pharmacy_id: number;
	pharmacy: PharmacyBasic;
};

export type PopularProduct = {
	id: number;
	name: string;
	strength: string;
	unit_price: string;
	medicine_image: string;
	dosage_form: string;
	category: string;
};

export type CartMedicine = {
	id: number;
	name: string;
	generic_name: string;
	strength: string;
	medicine_image: string;
	dosage_form: string;
	available_stock: number;
};

export type CartItem = {
	id: number;
	medicine: CartMedicine;
	quantity: number;
	unit_price: number;
	subtotal: number;
};

export type Cart = {
	cart_id: number;
	pharmacy: PharmacyBasic; // reused
	total_amount: number;
	total_items: number;
	items: CartItem[];
};

export type NotificationData = {
	appointment_id: number;
	doctor_name: string;
	time: string; // "HH:mm"
	appointment_date: string; // "YYYY-MM-DD"
	appointment_type: string; // e.g., "onsite"
	entity_type: 'doctor' | 'lab' | 'pharmacy';
	entity_id: number;
};

export type NotificationSender = {
	id: number;
	name: string;
	image: string;
	role: string;
};

export type NotificationType = {
	id: number;
	type: string; // e.g., "appointment_reminder"
	title: string;
	message: string;
	data: NotificationData;
	action_url: string;
	is_read: boolean;
	priority: 'low' | 'medium' | 'high';
	created_at: string; // ISO timestamp
	read_at: string | null;
	sender: NotificationSender;
};
