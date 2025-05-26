import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../lib/data";
import { useUserData } from "./useUserData";
import { FollowType } from "../lib/types";
import toast from "react-hot-toast";

export function useFollow(userId?: string) {
	const { user } = useUserData();
	const queryClient = useQueryClient();
	const token = localStorage.getItem("token");

	// Get followers and followings
	const getFollows = async (type: "followers" | "following"): Promise<FollowType[]> => {
		const res = await axios.get(`${BASE_URL}/users/${user?._id}/${type}`);
		return res.data.data;
	};

	const followersQuery = useQuery<FollowType[]>({
		enabled: !!user?._id,
		queryKey: ["users", user?._id, "followers"],
		queryFn: () => getFollows("followers"),
	});

	const followingsQuery = useQuery<FollowType[]>({
		enabled: !!user?._id,
		queryKey: ["users", user?._id, "following"],
		queryFn: () => getFollows("following"),
	});

	const followerData = followersQuery.data;
	const followerLoading = followersQuery.isLoading;
	const followingData = followingsQuery.data;
	const followingLoading = followingsQuery.isLoading;

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

	// Count of follower or following
	const followerCount = `${followerLoading ? "..." : `${followerData?.length || 0}`}`;
	const followingCount = `${followingLoading ? "..." : `${followingData?.length || 0}`}`;

	return {
		// For both
		followUser,
		unfollowUser,

		// Follower
		followerData,
		followerCount,
		followerLoading,

		// Following
		followingData,
		followingCount,
		followingLoading,
	};
}
