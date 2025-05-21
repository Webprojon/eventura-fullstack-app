import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../lib/data";
import toast from "react-hot-toast";
import { useUser } from "./useUser";
import axios, { AxiosError } from "axios";
import { useGetSingleEvent } from "./useGetSingleEvent";

export function useJoinEvent(eventId: string | undefined) {
	const queryClient = useQueryClient();
	const token = localStorage.getItem("token");
	const { event } = useGetSingleEvent();
	const { user } = useUser();

	const { mutate, isPending, data, error } = useMutation({
		mutationFn: async () => {
			const res = await axios.post(`${BASE_URL}/events/${eventId}/join`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
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

	const isJoined = event?.eventParticipants.some((participant: { _id: string }) => participant._id === user?._id);

	return {
		joinEvent: mutate,
		isJoining: isPending,
		isJoined,
		token,
		data,
		error,
	};
}
