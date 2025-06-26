import { config } from "dotenv";

//config({ path: ".env.development.local" });
config();

export const {
	PORT,
	DB_URI,
	NODE_ENV,
	CLOUDINARY_API_KEY,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_SECRET,
	ACCESS_TOKEN_JWT_SECRET,
	ACCESS_TOKEN_JWT_EXPIRES_IN,
} = process.env;
