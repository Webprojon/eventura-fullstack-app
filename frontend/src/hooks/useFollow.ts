import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUserData } from "./useUserData";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { apiRequest } from "../lib/apiRequest";

export function useFollow() {
	const { userData } = useUserData();
	const queryClient = useQueryClient();
	const { token } = useAuthStore();

	const handleError = (error: AxiosError<{ message: string }>) => {
		const message = error.response?.data?.message || error.message || "Network error";
		toast.error(message);
	};

	const followUser = useMutation({
		mutationFn: async () => {
			const res = await apiRequest.post(
				`/users/${userData._id}/follow`,
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

	const unfollowUser = useMutation({
		mutationFn: async () => {
			const res = await apiRequest.delete(`/users/${userData._id}/unfollow`, {
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

	return {
		followUser,
		unfollowUser,
	};
}

// -----------------------------------------RED ZONE-----------------------------------------------
// Get followers and followings
//const getFollows = async (type: "followers" | "following"): Promise<FollowType[]> => {
//	const res = await axios.get(`${BASE_URL}/users/${accountOwner?._id}/${type}`);
//	return res.data.data;
//};

//const followersQuery = useQuery<FollowType[]>({
//	enabled: !!accountOwner?._id,
//	queryKey: ["users", accountOwner?._id, "followers"],
//	queryFn: () => getFollows("followers"),
//});

//const followingsQuery = useQuery<FollowType[]>({
//	enabled: !!accountOwner?._id,
//	queryKey: ["users", accountOwner?._id, "following"],
//	queryFn: () => getFollows("following"),
//});

// Follower -----------------
//const followerData = followersQuery.data,
//const followerLoading = followersQuery.isLoading,

// Following ----------------
//const followingData = followingsQuery.data,
//const followingLoading = followingsQuery.isLoading,
// -----------------------------------------RED ZONE-----------------------------------------------
