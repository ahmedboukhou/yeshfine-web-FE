import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DoctorSpecialtiesType } from '../interfaces';

interface SpecialtiesStore {
	specialties: DoctorSpecialtiesType[] | [];
	setSpecialties: (specialties: DoctorSpecialtiesType[]) => void;
}

export const useDoctorSpecialtiesStore = create<SpecialtiesStore>()(
	persist(
		(set) => ({
			specialties: [],
			setSpecialties: (specialties) => set({ specialties }),
		}),
		{
			name: 'specialties',
		}
	)
);
