import { create } from "zustand";

type calendarState = {
	calendarValue: Date | null;
	setCalendarValue: (value: Date | null) => void;
};

const useCalendarStore = create<calendarState>((set) => ({
	calendarValue: new Date(),
	setCalendarValue: (value) => set({ calendarValue: value }),
}));

export default useCalendarStore;
