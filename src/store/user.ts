import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CurrentUserType } from '../interfaces';

// 2. Define the store's state and actions
interface CurrentUserStore {
	currentUser: CurrentUserType | null;
	setCurrentUser: (user: CurrentUserType) => void;
	clearCurrentUser: () => void;
}

// 3. Create the store with type safety
export const useCurrentUserStore = create<CurrentUserStore>()(
	persist(
		(set) => ({
			currentUser: null,
			setCurrentUser: (user) => set({ currentUser: user }),
			clearCurrentUser: () => set({ currentUser: null }),
		}),
		{
			name: 'current-user', // localStorage key
		}
	)
);
