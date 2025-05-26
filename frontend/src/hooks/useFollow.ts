import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../lib/data";
import { useUserData } from "./useUserData";
import { FollowType } from "../lib/types";
import toast from "react-hot-toast";

export function useFollow(mode: "follower" | "following", userId?: string) {
	const { user } = useUserData();
	const queryClient = useQueryClient();
	const token = localStorage.getItem("token");

	const ENDPOINT = mode === "follower" ? "followers" : "following";

	// Get followers or following
	const { data, isLoading } = useQuery<{ data: FollowType[] }>({
		enabled: !!user?._id,
		queryKey: ["users", user?._id, ENDPOINT],
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/users/${user?._id}/${ENDPOINT}`);
			return res.data;
		},
	});

	// Handle errors
	const handleError = (error: AxiosError<{ message: string }>) => {
		const message = error.response?.data?.message || error.message || "Network error";
		toast.error(message);
	};

	// Follow user
	const followUser = useMutation({
		mutationFn: async () => {
			const res = await axios.post(
				`${BASE_URL}/users/${userId}/follow`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast.success("You followed successfully!");
		},
		onError: handleError,
	});

	// Unfollow user
	const unfollowUser = useMutation({
		mutationFn: async () => {
			const res = await axios.delete(`${BASE_URL}/users/${userId}/unfollow`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast.success("You unfollowed successfully!");
		},
		onError: handleError,
	});

	// User's count of follower or following
	const followCount = `${isLoading ? "..." : `${data?.data?.length || 0}`}`;

	// Account owner's count of follower or following

	return {
		isLoading,
		followUser,
		followCount,
		unfollowUser,
		followItems: data?.data,
	};
}
