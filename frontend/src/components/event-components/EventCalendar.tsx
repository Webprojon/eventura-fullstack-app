import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import { useGetEvents } from "../../hooks/useGetEvents";
import EventCalendarSkeleton from "../skeletons/EventCalendarSkeleton";
import useCalendarStore from "../../store/calendarStore";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function EventCalendar() {
	const { calendarValue, setCalendarValue } = useCalendarStore();
	const { filteredEvents, isLoading } = useGetEvents();
	const [hasUserInteracted, setHasUserInteracted] = useState(false);

	useEffect(() => {
		if (hasUserInteracted && calendarValue) {
			toast.success(`${filteredEvents?.length} Events found for the selected date.`);
		}
	}, [hasUserInteracted, calendarValue, filteredEvents]);

	return isLoading ? (
		<EventCalendarSkeleton />
	) : (
		<div className="hidden md:block">
			<Calendar
				inline
				showWeek
				value={calendarValue}
				onChange={(e) => {
					setCalendarValue(e.value as Date);
					setHasUserInteracted(true);
				}}
				className="flex-1 select-none border rounded-md"
			/>
		</div>
	);
}
