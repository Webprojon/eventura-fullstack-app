import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
	PORT,
	DB_URI,
	NODE_ENV,
	CLOUDINARY_API_KEY,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_SECRET,
	ACCESS_TOKEN_JWT_SECRET,
	REFRESH_TOKEN_JWT_SECRET,
	ACCESS_TOKEN_JWT_EXPIRES_IN,
	REFRESH_TOKEN_JWT_EXPIRES_IN,
} = process.env;
