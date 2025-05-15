import { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import { useGetEvents } from "../../hooks/useGetEvents";
import EventCalendarSkeleton from "../skeletons/EventCalendarSkeleton";

export default function EventCalendar() {
	const [dateValue, setDateValue] = useState<Date | null>(new Date());
	const { isLoading } = useGetEvents();

	return isLoading ? (
		<EventCalendarSkeleton />
	) : (
		<div className="hidden md:block">
			<Calendar inline showWeek value={dateValue} onChange={(e) => setDateValue(e.value as Date)} className="flex-1 select-none border rounded-md" />
		</div>
	);
}
