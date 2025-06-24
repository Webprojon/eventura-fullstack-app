import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventFormData } from "../lib/types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";
import { apiRequest } from "../lib/apiRequest";

type UseEventFormHandlerProps = { mode: "create" } | { mode: "edit"; id?: string };

export function useEventFormHandler(props: UseEventFormHandlerProps) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { token } = useAuthStore();

	const [formData, setFormData] = useState<EventFormData>({
		eventTitle: "",
		eventCategory: "",
		eventCity: "",
		eventAvenue: "",
		eventDate: "",
		eventTime: "",
		eventDescription: "",
	});

	const useGetEventById = (id: string | undefined, enabled: boolean) => {
		return useQuery({
			queryKey: ["event", id],
			queryFn: async () => {
				const res = await apiRequest(`/events/${id}`);
				return res.data.data;
			},
			enabled: enabled && !!id,
		});
	};

	// If editing, fetch existing event
	const isEditMode = props.mode === "edit";
	const { data, isLoading } = useGetEventById(isEditMode ? props.id : undefined, isEditMode);

	useEffect(() => {
		if (data) {
			setFormData({
				eventTitle: data.eventTitle,
				eventCategory: data.eventCategory,
				eventCity: data.eventCity,
				eventAvenue: data.eventAvenue,
				eventDate: new Date(data.eventDate).toISOString().split("T")[0],
				eventTime: data.eventTime,
				eventDescription: data.eventDescription,
			});
		}
	}, [data]);

	// Handle input change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// API call for create or update
	const submitEvent = async (eventData: EventFormData) => {
		if (isEditMode) {
			const res = await apiRequest.put(`/events/${props.id}`, eventData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data;
		} else {
			const res = await apiRequest.post(`/events`, eventData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data;
		}
	};

	const { mutate, isPending } = useMutation({
		mutationFn: submitEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
			toast.success(isEditMode ? "Event is successfully updated!" : "New event is added!");
			navigate("/events");
		},
		onError: (error: AxiosError<{ message: string }>) => {
			const message = error.response?.data?.message ?? "Something went wrong";
			toast.error(message);
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (new Date(formData.eventDate) < new Date()) {
			toast.error("Event date cannot be in the past.");
			return;
		}

		mutate(formData);
	};

	return {
		formData,
		handleChange,
		handleSubmit,
		isPending,
		isLoading,
	};
}
