import { AuthUserType, UseAuthorizationProps } from "../lib/types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { LoginSchema } from "../lib/validation/login.schema";
import { RegisterSchema } from "../lib/validation/register.schema";
import { apiRequest } from "../lib/apiRequest";

export function useAuthorization({ mode }: UseAuthorizationProps) {
	const navigate = useNavigate();

	// API Call
	const authFn = async (userData: AuthUserType) => {
		const url = mode === "login" ? "auth/sign-in" : "auth/sign-up";
		const res = await apiRequest.post(`/${url}`, userData, {
			withCredentials: true,
		});
		return res.data;
	};

	// Mutation
	const { mutate, isPending } = useMutation({
		mutationFn: authFn,
		onSuccess: () => {
			toast.success(mode === "login" ? "You're inside the system!" : "Your account is ready to use!");
			navigate("/events");
		},
		onError: (error: Error) => {
			toast.error(mode === "login" ? "Incorrect email or password, try again" : error.message || "Something went wrong. Please try again.");
		},
	});

	// Submit the form
	const handleSubmit = (e: React.FormEvent, formData: AuthUserType, setErrors: (errors: Partial<Record<string, string>>) => void) => {
		e.preventDefault();

		const schema = mode === "login" ? LoginSchema : RegisterSchema;
		const result = schema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Partial<Record<string, string>> = {};
			result.error.errors.forEach((err) => {
				const field = err.path[0] as string;
				fieldErrors[field] = err.message;
			});
			setErrors(fieldErrors);
			return;
		}

		setErrors({});
		mutate(formData);
	};

	return {
		handleSubmit,
		isPending,
	};
}
