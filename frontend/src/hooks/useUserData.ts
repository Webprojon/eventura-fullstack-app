import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../lib/data";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function useUserData() {
	const navigate = useNavigate();
	const { id } = useParams();

	// Get account owner's data
	const accountOwnerQuery = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/users/me`, {
				withCredentials: true,
			});
			return res.data?.data;
		},
	});
	const accountOwner = accountOwnerQuery.data ?? null;

	// Get other user's data
	const otherUserQuery = useQuery({
		enabled: !!id,
		queryKey: ["user", id],
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/users/user/${id}`, { withCredentials: true });
			return res.data?.data;
		},
	});
	const userData = otherUserQuery.data ?? null;

	const handleLogOut = async () => {
		await axios.post(`${BASE_URL}/users/sign-out`, {}, { withCredentials: true });
		navigate("/events");
	};

	const createEventOrSignInLink = `${accountOwner ? "/events/create-event" : "/sign-in"}`;
	const getUserProfileLink = (id: string) => (accountOwner?._id === id ? `/account/me` : `/profile/user/${id}`);

	return {
		handleLogOut,
		accountOwner,
		getUserProfileLink,
		createEventOrSignInLink,
		isLoading: accountOwnerQuery.isLoading,

		userData,
		isloading: otherUserQuery.isLoading,
	};
}
