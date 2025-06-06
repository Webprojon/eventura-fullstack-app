import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../lib/data";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";

export function useDeleteEvent() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { token } = useAuthStore();

	const deleteEventMutation = useMutation({
		mutationFn: async (id: string) => {
			await axios.delete(`${BASE_URL}/events/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return id;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
			toast.success("Event successfully deleted.");
			navigate("/events");
		},
		onError: (error: AxiosError<{ message: string }>) => {
			const message = error.response?.data?.message ?? "Something went wrong";
			toast.error(message);
		},
	});

	const handleDelete = (id: string) => deleteEventMutation.mutate(id);

	return {
		handleDelete,
	};
}
