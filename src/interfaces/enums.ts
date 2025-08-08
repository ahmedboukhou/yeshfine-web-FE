export enum Role {
	Lab = 'lab',
	Doctor = 'doctor',
	Pharmacist = 'pharmacist',
	Patient = 'patient',
}

export enum responseStatus {
	Success = 'success',
	Error = 'error',
}

export enum AppointmentFilterTypeEnum {
	Today = 'today',
	Upcoming = 'upcoming',
	Past = 'past',
}

export enum AppointmentTypeEnum {
	Onsite = 'onsite',
	Virtual = 'virtual',
}
export enum LabStatusEnum {
	Pending = 'pending',
	Uploaded = 'uploaded',
	Paid = 'paid',
}

export enum LocationEnum {
	All = 'all',
	City = 'my_city',
	NearMe = 'near_me',
}

export enum PaymentStatusEnum {
	Paid = 'paid',
	NotPaid = 'not_paid',
}

export enum OrderStatusEnum {
  Pending = 'pending',
  Completed = 'completed',
  Cancelled = 'cancelled',
}
