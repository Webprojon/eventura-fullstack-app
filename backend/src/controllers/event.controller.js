import Event from "../models/event.model.js";

// GET all events
export const getAllEvents = async (req, res, next) => {
	try {
		const events = await Event.find().populate({ path: "user", select: "-password" }).populate({ path: "eventParticipants", select: "-password" });

		res.status(200).json({ success: true, data: events });
	} catch (error) {
		next(error);
	}
};

// GET a single event
export const getEvent = async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.id)
			.populate({ path: "user", select: "-password" })
			.populate({ path: "eventParticipants", select: "-password" });

		if (!event) {
			const error = new Error("This event is not found");
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({ success: true, data: event });
	} catch (error) {
		next(error);
	}
};

// CREATE an event
export const createEvent = async (req, res) => {
	try {
		const userId = req.user._id;
		const newEvent = await Event.create({
			...req.body,
			user: userId,
		});

		res.status(201).json({ success: true, data: newEvent });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// UPDATE an event
export const updateEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});

		if (!updatedEvent) res.status(404).json({ message: "Event not found" });

		res.status(200).json({ success: true, data: updatedEvent });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// DELETE an event
export const deleteEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const deleteEvent = await Event.findByIdAndDelete(id);

		if (!deleteEvent) {
			return res.status(404).json({ message: "Event not found" });
		}
		return res.status(200).json({
			success: true,
			message: "Event deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Join Event
export const joinEvent = async (req, res) => {
	try {
		const eventId = req.params.eventId;
		const userId = req.user._id;

		// Find event
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({ message: "Event Not found" });
		}

		// Check isn't my own event
		if (event.user.toString() === userId.toString()) {
			return res.status(400).json({ message: "You cannot join your own event" });
		}

		// Check if user already joined
		if (event.eventParticipants.includes(userId)) {
			return res.status(400).json({ message: "You have already joined this event" });
		}

		// Add user to event
		event.eventParticipants.push(userId);
		await event.save();

		// Populate participants
		await event.populate("eventParticipants", "-password");

		return res.status(200).json({
			message: "Successfully joined the event",
			event,
		});
	} catch (error) {
		return res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Cancel Event
export const cancelEvent = async (req, res) => {
	try {
		const eventId = req.params.eventId;
		const userId = req.user._id;

		// Find event
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}

		// Check if user is a participant
		const index = event.eventParticipants.indexOf(userId.toString());
		if (index === -1) {
			return res.status(400).json({ message: "You are not a participant of this event" });
		}

		// Remove user from event participants
		event.eventParticipants.splice(index, 1);
		await event.save();

		return res.status(200).json({
			message: "Successfully left the event",
			event,
		});
	} catch (error) {
		return res.status(500).json({ message: "Server error", error: error.message });
	}
};
