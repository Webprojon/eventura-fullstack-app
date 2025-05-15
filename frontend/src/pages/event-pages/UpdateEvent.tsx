import { Link, useParams } from "react-router-dom";
import { smoothOpacity } from "../../lib/page-animations";
import Input from "../../components/input-components/Input";
import { motion } from "framer-motion";
import { EventUpdateSkeleton } from "../../components/skeletons/EventUpdateSkeleton";
import { useEventFormHandler } from "../../hooks/useEventformHandler";

export default function UpdateEvent() {
	const { id } = useParams();
	const { formData, handleChange, handleSubmit, isPending, isLoading } = useEventFormHandler({ mode: "edit", id });
	
	if (isLoading) return <EventUpdateSkeleton />;

	return (
		<motion.section
			initial="initial"
			animate="animate"
			variants={smoothOpacity}
			className="max-w-[1350px] md:mx-2 px-4 xl:mx-auto md:rounded-md py-5 md:mt-9 border select-none bg-[#10141E]"
		>
			<form onSubmit={handleSubmit}>
				<>
					<h2 className="uppercase text-sm leading-none font-semibold text-sky-300">Event Details</h2>
					<div className="flex flex-wrap justify-between gap-6 mt-4">
						<Input type="text" name="eventTitle" id="event-title" text="Event Title" className="flex-[2]" value={formData.eventTitle} onChange={handleChange} />
						<select
							required
							id="event-category"
							name="eventCategory"
							value={formData.eventCategory}
							onChange={handleChange}
							className="flex-[2] border outline-none cursor-pointer rounded-md py-3 sm:py-2 px-3 text-[15px] text-slate-400 bg-[#10141E]"
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
					<h2 className="uppercase text-sm leading-none font-semibold text-sky-300">Event Location Details</h2>
					<div className="flex flex-wrap gap-6 mt-4">
						<Input type="text" name="eventCity" id="city" text="City" className="flex-[2]" value={formData.eventCity} onChange={handleChange} />
						<Input type="text" name="eventAvenue" id="avenue" text="Avenue" className="flex-[2]" value={formData.eventAvenue} onChange={handleChange} />
					</div>
				</div>

				<div className="mt-10">
					<h2 className="uppercase text-sm leading-none font-semibold text-sky-300">Event Date & Time</h2>
					<div className="flex flex-wrap gap-6 mt-4">
						<Input type="date" name="eventDate" id="date" text="Date" value={formData.eventDate} onChange={handleChange} />
						<Input type="time" name="eventTime" id="event-time" text="Event Title" value={formData.eventTime} onChange={handleChange} />
					</div>
				</div>

				<div className="mt-10">
					<label htmlFor="description" className="uppercase text-sm leading-none font-semibold text-sky-300">
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
						{isPending ? "Updating..." : "Update Event"}
					</button>
				</div>
			</form>
		</motion.section>
	);
}
