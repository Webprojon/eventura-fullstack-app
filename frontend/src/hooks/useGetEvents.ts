import { useQuery } from "@tanstack/react-query";
import { EventTypes } from "../lib/types";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../lib/data";
import axios from "axios";
import { useUser } from "./useUser";

export function useGetEvents() {
	const { user } = useUser();
	const { id } = useParams<{ id: string }>();

	const getEvents = async () => {
		const res = await axios.get(`${BASE_URL}/events`);
		return res.data;
	};

	const { data, isLoading } = useQuery<{ data: EventTypes[] }>({
		queryKey: ["events"],
		queryFn: getEvents,
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

	// EventSection items
	const today = new Date();
	const futureEvents = data?.data.filter((event) => event.eventParticipants.some((participant) => participant._id === user?._id));
	const pastEvents = data?.data.filter((event) => formatDate(event.eventDate) < formatDate(today));
	const ownerEvents = data?.data.filter((event) => event.user?._id === user?._id);

	return {
		id,
		isLoading,
		formatDate,
		pastEvents,
		ownerEvents,
		futureEvents,
		events: data?.data,
	};
}
