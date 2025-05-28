import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../lib/data";
import { useParams } from "react-router-dom";

export function useGetEvent() {
	const { eventId } = useParams();

	const { data, isLoading } = useQuery({
		queryKey: ["events", eventId],
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/events/${eventId}`);
			return res.data?.data;
		},
		enabled: !!eventId,
	});

	return {
		event: data,
		isLoading,
	};
}
