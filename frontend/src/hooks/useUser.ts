import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../lib/data";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useUser() {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const getUser = async () => {
		const res = await axios.get(`${BASE_URL}/users/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			withCredentials: true,
		});
		return res.data;
	};

	const { data, isLoading } = useQuery({
		queryKey: ["user"],
		queryFn: getUser,
		enabled: !!token,
	});

	const handleLogOut = () => {
		localStorage.removeItem("token");
		navigate("/events");
	};

	const user = data?.data;

	const linkTo = `${token ? "/events/create-event" : "/sign-in"}`;

	return {
		user,
		token,
		linkTo,
		isLoading,
		handleLogOut,
	};
}
