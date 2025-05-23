import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../lib/data";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useUserData() {
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
		queryFn: getUser,
		queryKey: ["user"],
		enabled: !!token,
	});

	const handleLogOut = () => {
		localStorage.removeItem("token");
		navigate("/events");
	};

	const createEventOrSignInLink = `${token ? "/events/create-event" : "/sign-in"}`;
	const getUserProfileLink = (id: string) => (data?.data?._id === id ? `/account/me` : `/profile/user/${id}`);

	return {
		token,
		isLoading,
		handleLogOut,
		user: data?.data,
		getUserProfileLink,
		createEventOrSignInLink,
	};
}
