import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DoctorSpecialtiesType } from '../interfaces';

interface MedicineStore {
	medicineCategories: DoctorSpecialtiesType[] | [];
	setMedicineCategories: (medicineCategories: DoctorSpecialtiesType[]) => void;
}

export const useMedicineCategoriesStore = create<MedicineStore>()(
	persist(
		(set) => ({
			medicineCategories: [],
			setMedicineCategories: (medicineCategories) => set({ medicineCategories }),
		}),
		{
			name: 'medicine_categories',
		}
	)
);
