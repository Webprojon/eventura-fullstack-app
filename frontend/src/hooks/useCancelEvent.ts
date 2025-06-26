import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiRequest } from "../lib/apiRequest";

export function useCancelEvent(eventId: string | undefined) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			const res = await apiRequest.post(`/events/${eventId}/cancel`, null, {
				withCredentials: true,
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
	};
}
