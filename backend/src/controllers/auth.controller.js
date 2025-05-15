import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// Get data from req.body
		const { name, email, password } = req.body;

		// Check they are exist or not
		if (!name || !email || !password) {
			return res.status(400).json({ message: "Name, email, and password are required" });
		}

		// Check is a user already exit
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			const error = new Error("User already exists");
			error.statusCode = 409;
			throw error;
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Creating new user
		const newUser = await User.create([{ name, email, password: hashedPassword }], { session });
		//const newUser = await User.create([{ name, email, password: hashedPassword }], { session });

		// Creating token
		const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		// Ending
		await session.commitTransaction();
		session.endSession();

		// if all is good
		res.status(201).json({
			success: true,
			message: "User created successfully",
			data: {
				token,
				user: newUser[0],
			},
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};

export const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Check they are exist or not
		if (!email || !password) {
			return res.status(400).json({ message: "Email, and password are required" });
		}

		// Check if user exist
		const user = await User.findOne({ email });

		// If user is not exist
		if (!user) {
			const error = new Error("User not found");
			error.statusCode = 404;
			throw error;
		}

		// Check if password correct
		const isPasswordValid = await bcrypt.compare(password, user.password);

		// If password incorrect
		if (!isPasswordValid) {
			const error = new Error("Invalid password");
			error.statusCode = 401;
			throw error;
		}

		// If password is correct, generate new token
		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		// if all match
		// Remove password before sending
		const { password: _, ...userWithoutPassword } = user.toObject();

		res.status(200).json({
			success: true,
			message: "User signed in successfully",
			data: {
				token,
				user: userWithoutPassword,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const signOut = async () => {};
