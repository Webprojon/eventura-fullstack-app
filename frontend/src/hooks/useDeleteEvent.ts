import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { apiRequest } from "../lib/apiRequest";

export function useDeleteEvent() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const deleteEventMutation = useMutation({
		mutationFn: async (id: string) => {
			await apiRequest.delete(`/events/${id}`, {
				withCredentials: true,
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
