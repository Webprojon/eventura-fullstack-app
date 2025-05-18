import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../lib/data";
import axios, { AxiosError } from "axios";

export function useDeleteEvent() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const deleteEvent = async (id: string) => {
		const token = localStorage.getItem("token");

		await axios.delete(`${BASE_URL}/events/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return id;
	};

	const mutation = useMutation({
		mutationFn: (id: string) => deleteEvent(id),
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

	const handleDelete = (id: string) => {
		mutation.mutate(id);
	};

	return {
		handleDelete,
	};
}
