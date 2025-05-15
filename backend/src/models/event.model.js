import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
	{
		eventTitle: {
			type: String,
			minLength: 5,
			maxLength: 70,
			required: [true, "Event title is required"],
		},
		eventCategory: {
			type: String,
			required: [true, "Category is required"],
		},
		eventCity: {
			type: String,
			required: true,
		},
		eventAvenue: {
			type: String,
			required: true,
		},
		eventDate: {
			type: Date,
			required: true,
		},
		eventTime: {
			type: String,
			required: true,
			match: [/^\d{2}:\d{2}$/, "Time must be in HH:MM format"],
		},
		eventDescription: {
			type: String,
			required: [true, "Event description is required"],
			maxlength: [1000, "Description cannot exceed 1000 characters"],
		},
		eventParticipants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
	},
	{ timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
