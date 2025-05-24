import { Router } from "express";

const followRouter = Router();

// Follow
followRouter.post("/:userId/follow", (req, res) => res.send({ title: "Follow" }));

// UnFollow
followRouter.delete("/:userId/unfollow", (req, res) => res.send({ title: "UnFollow" }));

// User Followers
followRouter.get("/:userId/followers", (req, res) => res.send({ title: "GET User Followers" }));

// User Followings
followRouter.get("/:userId/following", (req, res) => res.send({ title: "GET User Following" }));

export default followRouter;
