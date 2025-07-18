import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DoctorSpecialtiesType } from '../interfaces';

interface LabTestsStore {
	labTestsData: DoctorSpecialtiesType[] | [];
	setLabTestsData: (labTestsData: DoctorSpecialtiesType[]) => void;
}

export const useLabTestsStore = create<LabTestsStore>()(
	persist(
		(set) => ({
			labTestsData: [],
			setLabTestsData: (labTestsData) => set({ labTestsData }),
		}),
		{
			name: 'lab_tests',
		}
	)
);
