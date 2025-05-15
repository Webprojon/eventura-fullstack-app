import express from "express";
import { PORT } from "./config/env.js";
import eventRouter from "./routes/event.routes.js";
import connectToDatabase from "../database/mongodb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:5173", "https://eventura-hub.vercel.app"],
		credentials: true,
	}),
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
	res.send("Welcome to Eventura API");
});

app.listen(PORT, async () => {
	console.log(`Eventura API is running on http://localhost:${PORT}`);

	await connectToDatabase();
});

export default app;
