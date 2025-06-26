import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CurrentUserType } from '../interfaces';

// 2. Define the store's state and actions
interface CurrentUserStore {
	currentUser: CurrentUserType | null;
	setCurrentUser: (user: CurrentUserType) => void;
	clearCurrentUser: () => void;
}

export const useCurrentUserStore = create<CurrentUserStore>()(
	persist(
		(set) => ({
			currentUser: null,
			setCurrentUser: (user) => set({ currentUser: user }),
			clearCurrentUser: () => set({ currentUser: null }),
		}),
		{
			name: 'current-user',
		}
	)
);
