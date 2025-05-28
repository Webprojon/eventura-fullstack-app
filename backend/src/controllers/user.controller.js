import Event from "../models/event.model.js";
import User from "./../models/user.model.js";

// Get all users
export const getUsers = async (req, res, next) => {
	try {
		const users = await User.find().select("-password").populate("followers", "name email userImg").populate("following", "name email userImg");

		res.status(200).json({ success: true, data: users });
	} catch (error) {
		next(error);
	}
};

// Get single user
export const getUser = async (req, res, next) => {
	try {
		const { id } = req.params;

		const user = await User.findById(id).select("-password").populate("followers", "name email image").populate("following", "name email image");

		// Check if user not exist throw an error
		if (!user) {
			const error = new Error("User not found");
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({ success: true, data: user });
	} catch (error) {
		next(error);
	}
};

// Get account owner
export const getAccountOwner = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select("-password").populate("followers", "name email image").populate("following", "name email image");

		// Check if user not exist throw an error
		if (!user) {
			const error = new Error("User not found");
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({ success: true, data: user });
	} catch (error) {
		next(error);
	}
};

// Delete user
export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const deleteUser = await User.findByIdAndDelete(id);

		if (!deleteUser) {
			return res.status(404).json({ message: "User not found" });
		}

		await Event.deleteMany({ user: id });

		return res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update user
export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		const updateUser = await User.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});

		if (!updateUser) res.status(404).json({ message: "User not found" });

		res.status(200).json({ success: true, data: updateUser });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Add user's img
export const uploadImage = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		const imagePath = req.file.path;
		const { userId } = req.body;

		if (!userId) {
			return res.status(400).json({ error: "User id is required" });
		}

		const user = await User.findByIdAndUpdate(userId, { image: imagePath }, { new: true });

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({
			message: "Image uploaded and user updated",
			user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};
