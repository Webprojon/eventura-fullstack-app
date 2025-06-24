import { useQuery } from "@tanstack/react-query";
import { EventTypes } from "../lib/types";
import { useParams } from "react-router-dom";
import useCalendarStore from "../store/calendarStore";
import { apiRequest } from "../lib/apiRequest";

export function useGetEvents() {
	const { calendarValue } = useCalendarStore();
	const { id } = useParams<{ id: string }>();

	const { data, isLoading } = useQuery<{ data: EventTypes[] }>({
		queryKey: ["events"],
		queryFn: async () => {
			const res = await apiRequest("/events");
			return res.data;
		},
	});

	// Formatting date
	const formatDate = (dateString: string | Date): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const filteredEvents = data?.data?.filter((event) => (calendarValue ? formatDate(event.eventDate) === formatDate(calendarValue) : true));

	return {
		id,
		isLoading,
		formatDate,
		filteredEvents,
		events: data?.data,
	};
}
