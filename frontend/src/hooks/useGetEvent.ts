import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../lib/data";
import { useParams } from "react-router-dom";

export function useGetEvent() {
	const { id } = useParams();

	const { data, isLoading } = useQuery({
		queryKey: ["events", id],
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/events/${id}`);
			return res.data;
		},
		enabled: !!id,
	});

	return {
		event: data?.data,
		isLoading,
	};
}
