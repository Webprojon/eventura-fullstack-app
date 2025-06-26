import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ACCESS_TOKEN_JWT_SECRET } from "../config/env.js";

const authorize = async (req, res, next) => {
	try {
		const accessToken = req.cookies?.accessToken;

		if (!accessToken) return res.status(401).json({ message: "Unauthorized" });

		const decoded = jwt.verify(accessToken, ACCESS_TOKEN_JWT_SECRET);

		const user = await User.findById(decoded.userId);

		if (!user) return res.status(401).json({ message: "Unauthorized" });

		req.user = user;

		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorized", error: error.message });
	}
};

export default authorize;
