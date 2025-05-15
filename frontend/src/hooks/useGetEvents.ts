import { useQuery } from "@tanstack/react-query";
import { EventTypes } from "../lib/types";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../lib/data";
import axios from "axios";

export function useGetEvents() {
	const { id } = useParams<{ id: string }>();

	const getEvents = async () => {
		const res = await axios.get(`${BASE_URL}/events`);
		return res.data;
	};

	const { data, isLoading } = useQuery<{ data: EventTypes[] }>({
		queryKey: ["events"],
		queryFn: getEvents,
	});

	// Single event for EventDetail page
	const event = data?.data.find((detail) => detail._id === id);

	// Formatting date
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return {
		id,
		data,
		isLoading,
		event,
		formatDate,
	};
}
