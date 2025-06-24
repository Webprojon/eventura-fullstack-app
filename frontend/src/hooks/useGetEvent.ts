import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiRequest } from "../lib/apiRequest";

export function useGetEvent() {
	const { eventId } = useParams();

	const { data, isLoading } = useQuery({
		queryKey: ["events", eventId],
		queryFn: async () => {
			const res = await apiRequest(`/events/${eventId}`);
			return res.data?.data;
		},
		enabled: !!eventId,
	});

	return {
		event: data,
		isLoading,
	};
}
