import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { getRefreshToken } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

authRouter.post("/refresh", getRefreshToken);

export default authRouter;
