import { Router } from "express";
import authorize from "./../middlewares/auth.middleware.js";
import { followUser, getUserFollowers, getUserFollowings, unFollowUser } from "../controllers/follow.controller.js";

const followRouter = Router();

// Follow
followRouter.post("/:id/follow", authorize, followUser);

// UnFollow
followRouter.delete("/:id/unfollow", authorize, unFollowUser);

// User Followers
followRouter.get("/:id/followers", getUserFollowers);

// User Followings
followRouter.get("/:id/following", getUserFollowings);

export default followRouter;
