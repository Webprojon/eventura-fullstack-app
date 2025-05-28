import { useQuery } from "@tanstack/react-query";
import { EventTypes } from "../lib/types";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../lib/data";
import axios from "axios";
import { useUserData } from "./useUserData";

export function useGetEvents() {
	const { accountOwner } = useUserData();
	const { id } = useParams<{ id: string }>();

	const { data, isLoading } = useQuery<{ data: EventTypes[] }>({
		queryKey: ["events"],
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/events`);
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

	// EventSection items
	const today = new Date();
	const futureEvents = data?.data.filter((event) => event.eventParticipants.some((participant) => participant._id === accountOwner?._id));
	const ownerEvents = data?.data.filter((event) => event.user?._id === accountOwner?._id);
	const pastEvents = ownerEvents?.filter((event) => new Date(event.eventDate) < new Date(today));

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
