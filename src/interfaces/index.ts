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

export type LabDetail = {
	id: number;
	average_rating: string;
};

export type Lab = {
	id: number;
	name: string;
	address: string;
	image: string;
	labDetail: LabDetail;
};

export type TopDoctor = {
	id: number;
	name: string;
	image: string;
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
	opening_time: string;
	rating: string;
	totalReviews: number;
};

export type TopLab = {
	id: number;
	name: string;
	image: string;
	licenseNumber: string;
	rating: string;
	totalReviews: number;
};

export type DoctorSpecialtiesType = {
	id: number;
	name: string;
};
