import { Router } from "express";
import { deleteUser, getAccountOwner, getUser, getUsers, updateUser, uploadImage } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multerConfig.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/user/:id", getUser);

userRouter.get("/me", authorize, getAccountOwner);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

userRouter.post("/upload", upload.single("userImg"), uploadImage);

export default userRouter;
