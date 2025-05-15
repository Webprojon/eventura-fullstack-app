import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../lib/data";
import axios from "axios";

export function useDeleteEvent() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const deleteEvent = async (id: string) => {
		await axios.delete(`${BASE_URL}/events/${id}`);
		return id;
	};

	const mutation = useMutation({
		mutationFn: (id: string) => deleteEvent(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
			toast.success("Event successfully deleted.");
			navigate("/events");
		},
	});

	const handleDelete = (id: string) => {
		mutation.mutate(id);
	};

	return {
		handleDelete,
	};
}
