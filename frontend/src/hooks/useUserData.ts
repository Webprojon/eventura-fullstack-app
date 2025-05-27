import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../lib/data";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function useUserData() {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const { id } = useParams();

	// Get account owner's data
	const accountOwnerQuery = useQuery({
		queryKey: ["user"],
		enabled: !!token,
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				withCredentials: true,
			});
			return res.data?.data;
		},
	});
	const accountOwner = accountOwnerQuery.data ?? null;

	// Get specific user's data
	const specificUserQuery = useQuery({
		enabled: !!id,
		queryKey: ["user", id],
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/users/user/${id}`);
			return res.data?.data;
		},
	});
	const userData = specificUserQuery.data ?? null;

	const handleLogOut = () => {
		localStorage.removeItem("token");
		navigate("/events");
	};

	const createEventOrSignInLink = `${token ? "/events/create-event" : "/sign-in"}`;
	const getUserProfileLink = (id: string) => (accountOwner?._id === id ? `/account/me` : `/profile/user/${id}`);

	return {
		token,
		handleLogOut,
		accountOwner,
		getUserProfileLink,
		createEventOrSignInLink,
		isLoading: accountOwnerQuery.isLoading,

		userData,
		isloading: specificUserQuery.isLoading,
	};
}
