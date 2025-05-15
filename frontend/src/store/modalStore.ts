import { create } from "zustand";

type ModalStoreType = {
	menuStates: Record<string, boolean>;
	toggleMenu: (id: string) => void;
	isMenuOpen: (id: string) => boolean;
};

const useModalStore = create<ModalStoreType>((set, get) => ({
	menuStates: {},
	toggleMenu: (id) =>
		set((state) => ({
			menuStates: {
				...state.menuStates,
				[id]: !state.menuStates[id],
			},
		})),
	isMenuOpen: (id) => !!get().menuStates[id],
}));

export default useModalStore;
