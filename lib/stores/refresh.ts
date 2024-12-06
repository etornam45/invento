import { create } from 'zustand'

interface RefreshStore {
    refresh: boolean;
    pullMe: () => void;
}

export const refreshStore = create<RefreshStore>((set) => ({
    refresh: false,
    pullMe: () => {
        set({ refresh: true });
        setTimeout(() => {
            set({ refresh: false });
        }, 1000);
    }
}));