import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../lib/data";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

export function useUserData() {
	const { token } = useAuthStore();
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

	// Get other user's data
	const otherUserQuery = useQuery({
		enabled: !!id,
		queryKey: ["user", id],
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/users/user/${id}`);
			return res.data?.data;
		},
	});
	const userData = otherUserQuery.data ?? null;

	const createEventOrSignInLink = `${token ? "/events/create-event" : "/sign-in"}`;
	const getUserProfileLink = (id: string) => (accountOwner?._id === id ? `/account/me` : `/profile/user/${id}`);

	return {
		token,
		accountOwner,
		getUserProfileLink,
		createEventOrSignInLink,
		isLoading: accountOwnerQuery.isLoading,

		userData,
		isloading: otherUserQuery.isLoading,
	};
}
