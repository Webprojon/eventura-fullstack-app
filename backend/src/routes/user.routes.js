import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser, uploadImage } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multerConfig.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/me", authorize, getUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

userRouter.post("/upload", upload.single("userImg"), uploadImage);

export default userRouter;
