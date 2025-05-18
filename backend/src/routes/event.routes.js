import { Router } from "express";
import { cancelEvent, createEvent, deleteEvent, getAllEvents, getEvent, joinEvent, updateEvent } from "../controllers/event.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const eventRouter = Router();

eventRouter.get("/", getAllEvents);

eventRouter.get("/:id", getEvent);

eventRouter.post("/", authorize, createEvent);

eventRouter.put("/:id", authorize, updateEvent);

eventRouter.delete("/:id", authorize, deleteEvent);

eventRouter.post("/:eventId/join", authorize, joinEvent);

eventRouter.post("/:eventId/cancel", authorize, cancelEvent);

export default eventRouter;
