export type CurrentUserType = {
	name: string;
	phone: string;
	role: string;
	dob: string;
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
	image: string;
	todaySlot: string;
	distance: null | number;
	labDetail: { id: number; average_rating: string };
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
};

export type WeeklyAvailability = {
	mon?: TimeSlot[];
	tue?: TimeSlot[];
	wed?: TimeSlot[];
	thu?: TimeSlot[];
	fri?: TimeSlot[];
	sat?: TimeSlot[];
	sun?: TimeSlot[];
};

export type DoctorReviewType = {
	id: number;
	rating: string;
	review_text: string;
	created_at: string;
	user: { id: number; name: string; image: string };
};
