import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import { useGetEvents } from "../../hooks/useGetEvents";
import EventCalendarSkeleton from "../skeletons/EventCalendarSkeleton";
import useCalendarStore from "../../store/calendarStore";

export default function EventCalendar() {
	const { calendarValue, setCalendarValue } = useCalendarStore();
	const { isLoading } = useGetEvents();

	return isLoading ? (
		<EventCalendarSkeleton />
	) : (
		<div className="hidden md:block">
			<Calendar inline showWeek value={calendarValue} onChange={(e) => setCalendarValue(e.value as Date)} className="flex-1 select-none border rounded-md" />
		</div>
	);
}
