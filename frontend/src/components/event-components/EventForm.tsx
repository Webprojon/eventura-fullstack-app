import { Link, useLocation, useParams } from "react-router-dom";
import { useEventFormHandler } from "../../hooks/useEventformHandler";
import Input from "../input-components/Input";

export default function EventForm() {
	const pathname = useLocation().pathname;
	const { id } = useParams();
	const { formData, handleChange, handleSubmit, isPending } = useEventFormHandler({ mode: pathname === "/events/create-event" ? "create" : "edit", id });

	return (
		<form onSubmit={handleSubmit}>
			<>
				<h2 className="event-label">Event Details</h2>
				<div className="flex flex-wrap justify-between gap-6 mt-4">
					<Input type="text" name="eventTitle" id="event-title" text="Event Title" className="flex-[2]" value={formData.eventTitle} onChange={handleChange} />
					<select
						required
						id="event-category"
						name="eventCategory"
						value={formData.eventCategory}
						onChange={handleChange}
						className="flex-[2] border outline-none cursor-pointer rounded-md py-3 sm:py-2 px-3 text-sm text-slate-400 bg-primary"
					>
						<option value="" disabled>
							Select Category
						</option>
						<option value="business">Business</option>
						<option value="entertainment">Entertainment</option>
						<option value="other">Other</option>
					</select>
				</div>
			</>

			<div className="mt-10">
				<h2 className="event-label">Event Location Details</h2>
				<div className="flex flex-wrap gap-6 mt-4">
					<Input type="text" name="eventCity" id="city" text="City" className="flex-[2]" value={formData.eventCity} onChange={handleChange} />
					<Input type="text" name="eventAvenue" id="avenue" text="Avenue" className="flex-[2]" value={formData.eventAvenue} onChange={handleChange} />
				</div>
			</div>

			<div className="mt-10">
				<h2 className="uppercase text-sm leading-none font-semibold text-sky-300">Event Date & Time</h2>
				<div className="flex flex-wrap gap-6 mt-4">
					<Input type="date" name="eventDate" id="date" text="Date" value={formData.eventDate} onChange={handleChange} />
					<Input type="time" name="eventTime" id="event-time" text="Event Time" value={formData.eventTime} onChange={handleChange} />
				</div>
			</div>

			<div className="mt-10">
				<label htmlFor="description" className="event-label">
					Description
				</label>
				<textarea
					id="description"
					autoComplete="off"
					name="eventDescription"
					onChange={handleChange}
					value={formData.eventDescription}
					placeholder="Write a brief description..."
					className="w-full mt-3 mb-5 bg-transparent py-2 px-3 text-[15px] min-h-[14vh] small-scroll rounded-md outline-none border text-slate-400 placeholder:text-slate-400"
				></textarea>
			</div>

			<div className="flex justify-end gap-x-6">
				<Link to="/events" className="py-[9px] sm:py-2 px-7 rounded-md font-semibold border-1 border-sky-300 text-sky-300">
					Cancel
				</Link>
				<button type="submit" className="py-[9px] sm:py-2 px-7 btn" disabled={isPending}>
					{isPending
						? `${pathname === "/events/create-event" ? "Creating" : "Updating"}`
						: `${pathname === "/events/create-event" ? "Create Event" : "Update Event"}`}
				</button>
			</div>
		</form>
	);
}
