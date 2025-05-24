import Follow from "./../models/follow.model.js";
import User from "./../models/user.model.js";

// Follow User
export const followUser = async (req, res) => {
	try {
		const followingId = req.params.id;
		const followerId = req.user._id;

		if (followerId === followingId) {
			return res.status(403).json({ message: "You cannot follow yourself" });
		}

		// followerId: req.user._id, followingId: req.params.id
		const isFollowedAlready = await Follow.findOne({ followerId, followingId });

		if (isFollowedAlready) {
			return res.status(409).json({ message: "You are already following this user" });
		}

		await Follow.create({ followerId, followingId });

		res.status(201).json({ message: "User followed successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Unfollow User
export const unFollowUser = async (req, res) => {
	try {
		const followingId = req.params.id;
		const followerId = req.user._id;

		// followerId: req.user._id, followingId: req.params.id
		const isFollowedAlready = await Follow.findOne({ followerId, followingId });

		if (!isFollowedAlready) {
			return res.status(404).json({ message: "Follow relationship not found" });
		}

		await Follow.deleteOne({ followerId, followingId });

		res.status(200).json({ message: "Unfollowed successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get User Followers
export const getUserFollowers = async (req, res) => {
	try {
		const userId = req.params.id;

		const followers = await Follow.find({ followingId: userId }).select("followerId");

		const followerIds = followers.map((f) => f.followerId);

		if (followerIds.length === 0) {
			return res.status(200).json({ success: true, data: [], message: "You don't have followers" });
		}

		const followerUsers = await User.find({ _id: { $in: followerIds } }).select("-password");

		res.status(200).json({ success: true, data: followerUsers });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// Get User Followings
export const getUserFollowings = async (req, res) => {
	try {
		const userId = req.params.id;

		const followings = await Follow.find({ followerId: userId }).select("followingId");

		const followingIds = followings.map((f) => f.followingId);

		if (followingIds.length === 0) {
			return res.status(200).json({ success: true, data: [], message: "You don't have followings" });
		}

		const followingUsers = await User.find({ _id: { $in: followingIds } }).select("-password");

		res.status(200).json({ success: true, data: followingUsers });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};
