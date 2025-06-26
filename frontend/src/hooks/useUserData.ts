import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiRequest } from "../lib/apiRequest";

export function useUserData() {
	const { id } = useParams();

	// Get account owner's data
	const accountOwnerQuery = useQuery({
		queryKey: ["user"],
		//enabled: !!token,
		queryFn: async () => {
			const res = await apiRequest("/users/me", {
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
			const res = await apiRequest(`/users/user/${id}`);
			return res.data?.data;
		},
	});
	const userData = otherUserQuery.data ?? null;

	const createEventOrSignInLink = `${accountOwner ? "/events/create-event" : "/sign-in"}`;
	const getUserProfileLink = (id: string) => (accountOwner?._id === id ? `/account/me` : `/profile/user/${id}`);

	return {
		accountOwner,
		getUserProfileLink,
		createEventOrSignInLink,
		isLoading: accountOwnerQuery.isLoading,

		userData,
		isloading: otherUserQuery.isLoading,
	};
}
