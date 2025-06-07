import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ACCESS_TOKEN_JWT_SECRET, ACCESS_TOKEN_JWT_EXPIRES_IN, REFRESH_TOKEN_JWT_SECRET, REFRESH_TOKEN_JWT_EXPIRES_IN } from "../config/env.js";

const authorize = async (req, res, next) => {
	try {
		let token;

		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) return res.status(401).json({ message: "Unauthorized" });

		const decoded = jwt.verify(token, ACCESS_TOKEN_JWT_SECRET);

		const user = await User.findById(decoded.userId);

		if (!user) return res.status(401).json({ message: "Unauthorized" });

		req.user = user;

		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorized", error: error.message });
	}
};

export const getRefreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies?.refreshToken;

		// Check there is token or no
		if (!refreshToken) return res.status(401).json({ message: "Refresh token is required" });

		// Verify token
		const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_JWT_SECRET);

		// Find user
		const user = await User.findById(decoded.userId);
		if (!user) return res.status(403).json({ message: "Invalid refresh token" });

		// Create new access token
		const newAccessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN_JWT_SECRET, {
			expiresIn: ACCESS_TOKEN_JWT_EXPIRES_IN,
		});

		// Optional: Create new refresh token
		const newRefreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_JWT_SECRET, {
			expiresIn: REFRESH_TOKEN_JWT_EXPIRES_IN,
		});

		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: 3 * 24 * 60 * 60 * 1000,
		});

		res.status(200).json({
			accessToken: newAccessToken,
		});
	} catch (err) {
		res.status(403).json({ message: "Invalid or expired refresh token", error: err.message });
	}
};

export default authorize;
