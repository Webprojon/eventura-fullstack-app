import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../lib/data";
import toast from "react-hot-toast";
import axios from "axios";

export function useCancelEvent(eventId: string | undefined) {
	const queryClient = useQueryClient();
	const token = localStorage.getItem("token");

	const { mutate, isPending, data, error } = useMutation({
		mutationFn: async () => {
			const res = await axios.post(`${BASE_URL}/events/${eventId}/cancel`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data;
		},
		onSuccess: (data) => {
			toast.success(data.message || "Left the event successfully");
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
		onError: (error) => {
			toast.error(error.message || "Network error");
		},
	});

	return {
		cancelEvent: mutate,
		isCanceling: isPending,
		token,
		data,
		error,
	};
}
