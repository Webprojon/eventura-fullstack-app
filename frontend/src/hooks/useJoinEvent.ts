import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../lib/data";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useUserData } from "./useUserData";
import { useGetEvent } from "./useGetEvent";

export function useJoinEvent(eventId: string | undefined) {
	const queryClient = useQueryClient();
	const { event } = useGetEvent();
	const { accountOwner } = useUserData();

	const { mutate, isPending, data, error } = useMutation({
		mutationFn: async () => {
			const res = await axios.post(`${BASE_URL}/events/${eventId}/join`, null, {
				withCredentials: true,
			});
			return res.data;
		},
		onSuccess: (data) => {
			toast.success(data.message || "Joined the event successfully");
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
		onError: (error: AxiosError<{ message: string }>) => {
			const message = error.response?.data?.message || error.message || "Network error";
			toast.error(message);
		},
	});

	// Check if user is joind or not
	const isJoined = event?.eventParticipants.some((participant: { _id: string }) => participant._id === accountOwner?._id);

	return {
		joinEvent: mutate,
		isJoining: isPending,
		isJoined,
		data,
		error,
	};
}
